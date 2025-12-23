import dbConnect from '../../../lib/dbConnect';
import Member from '../../../models/Member';
import OTP from '../../../models/OTP';

// Mock data for local testing when MongoDB is unavailable
const MOCK_MEMBERS = {
    '12345': { MNo: '12345', Name: 'Prudhvi Naik', Mobile_No: '8019642185' },
    '1001': { MNo: '1001', Name: 'Rajesh Kumar', Mobile_No: '9876543210' },
    '1002': { MNo: '1002', Name: 'Priya Sundar', Mobile_No: '9898989898' },
};

// In-memory OTP store for mock mode
global.mockOtpStore = global.mockOtpStore || {};

// Generate 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via Fast2SMS (or demo mode)
async function sendSMS(mobileNumber, otp) {
    const apiKey = process.env.FAST2SMS_API_KEY;

    // Demo mode - just log the OTP
    if (!apiKey || process.env.NODE_ENV === 'development') {
        console.log(`[DEMO MODE] OTP for ${mobileNumber}: ${otp}`);
        return { success: true, demo: true };
    }

    try {
        const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
            method: 'POST',
            headers: {
                'authorization': apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                route: 'otp',
                variables_values: otp,
                numbers: mobileNumber,
            }),
        });

        const data = await response.json();
        return { success: data.return, message: data.message };
    } catch (error) {
        console.error('SMS sending failed:', error);
        return { success: false, error: error.message };
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { memberNumber: rawMemberNumber } = req.body;
    const memberNumber = String(rawMemberNumber || '').trim();

    console.log(`[DEBUG] Received member number: "${memberNumber}" (type: ${typeof memberNumber})`);
    console.log(`[DEBUG] Available mock members: ${Object.keys(MOCK_MEMBERS).join(', ')}`);

    if (!memberNumber) {
        return res.status(400).json({ message: 'Member Number is required' });
    }

    let member = null;
    let useMockMode = false;

    // Check mock data FIRST for faster local testing
    if (MOCK_MEMBERS[memberNumber]) {
        member = MOCK_MEMBERS[memberNumber];
        useMockMode = true;
        console.log(`[MOCK MODE] ✅ Found mock member: ${member.Name}`);
    } else {
        // Try database if not in mock data
        try {
            const connectPromise = dbConnect();
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('DB timeout')), 5000)
            );

            await Promise.race([connectPromise, timeoutPromise]);
            member = await Member.findOne({ MNo: memberNumber });
        } catch (dbError) {
            console.log('[MOCK MODE] Database unavailable:', dbError.message);
            useMockMode = true;
        }
    }

    if (!member) {
        return res.status(404).json({
            message: 'Member not found. Please check your Member Number.',
            hint: 'Try: 12345, 1001, or 1002'
        });
    }

    if (!member.Mobile_No) {
        return res.status(400).json({ message: 'No mobile number registered for this member.' });
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Store OTP (database or mock)
    if (!useMockMode) {
        try {
            await OTP.deleteMany({ memberNumber });
            await OTP.create({
                memberNumber,
                otp,
                mobileNumber: member.Mobile_No,
                expiresAt,
            });
        } catch (err) {
            useMockMode = true;
        }
    }

    // Mock mode - store in global memory
    if (useMockMode) {
        global.mockOtpStore[memberNumber] = { otp, expiresAt, mobileNumber: member.Mobile_No };
        console.log(`[MOCK MODE] Stored OTP ${otp} for member ${memberNumber}`);
    }

    // Send OTP via SMS
    const smsResult = await sendSMS(member.Mobile_No, otp);

    // Mask mobile number for response
    const maskedMobile = member.Mobile_No.replace(/(\d{2})\d{6}(\d{2})/, '$1******$2');

    console.log(`✅ OTP ${otp} sent to ${member.Mobile_No} for ${member.Name} (${memberNumber})${useMockMode ? ' [MOCK]' : ''}`);

    return res.status(200).json({
        message: 'OTP sent successfully',
        mobileNumber: maskedMobile,
        memberName: member.Name,
        demo: true, // Always show OTP for local testing
        otp, // Include OTP for testing
        mockMode: useMockMode,
    });
}

// Export mock members for verify-otp
export { MOCK_MEMBERS };
