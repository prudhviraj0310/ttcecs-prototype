import dbConnect from '../../../lib/dbConnect';
import Member from '../../../models/Member';
import OTP from '../../../models/OTP';
import jwt from 'jsonwebtoken';
import { MOCK_MEMBERS } from './send-otp';

const JWT_SECRET = process.env.JWT_SECRET || 'ttcecs-member-portal-secret-key-2024';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { memberNumber, otp } = req.body;

    if (!memberNumber || !otp) {
        return res.status(400).json({ message: 'Member Number and OTP are required' });
    }

    let otpRecord = null;
    let member = null;
    let useMockMode = false;

    // Try database first with timeout
    try {
        const connectPromise = dbConnect();
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('DB timeout')), 5000)
        );

        await Promise.race([connectPromise, timeoutPromise]);

        otpRecord = await OTP.findOne({
            memberNumber,
            otp,
            verified: false,
        });

        if (otpRecord) {
            member = await Member.findOne({ MNo: memberNumber });
        }
    } catch (dbError) {
        console.log('[MOCK MODE] Database unavailable, using mock data');
        useMockMode = true;
    }

    // Fallback to mock mode
    if (!otpRecord && global.mockOtpStore && global.mockOtpStore[memberNumber]) {
        const mockOtp = global.mockOtpStore[memberNumber];
        if (mockOtp.otp === otp && new Date() < new Date(mockOtp.expiresAt)) {
            otpRecord = mockOtp;
            member = MOCK_MEMBERS[memberNumber];
            useMockMode = true;
            console.log(`[MOCK MODE] Verified OTP for ${memberNumber}`);
        }
    }

    if (!otpRecord) {
        return res.status(400).json({ message: 'Invalid OTP. Please try again.' });
    }

    // Check if OTP expired (for database mode)
    if (otpRecord.expiresAt && new Date() > new Date(otpRecord.expiresAt)) {
        if (!useMockMode) {
            await OTP.deleteOne({ _id: otpRecord._id });
        } else {
            delete global.mockOtpStore[memberNumber];
        }
        return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
    }

    if (!member) {
        return res.status(404).json({ message: 'Member not found.' });
    }

    // Generate JWT token
    const token = jwt.sign(
        {
            memberNumber: member.MNo,
            name: member.Name,
            mobileNumber: member.Mobile_No,
        },
        JWT_SECRET,
        { expiresIn: '24h' }
    );

    // Clean up OTP
    if (!useMockMode && otpRecord._id) {
        await OTP.deleteOne({ _id: otpRecord._id });
    } else {
        delete global.mockOtpStore[memberNumber];
    }

    console.log(`✅ Member ${member.Name} (${memberNumber}) logged in successfully${useMockMode ? ' [MOCK]' : ''}`);

    return res.status(200).json({
        message: 'Login successful',
        token,
        member: {
            MNo: member.MNo,
            Name: member.Name,
            Mobile_No: member.Mobile_No,
            Address: member.Address || 'Address on file',
            DOA: member.DOA || new Date('2020-01-01'),
            Gender: member.Gender || 'M',
            DOB: member.DOB || new Date('1990-01-01'),
        },
        mockMode: useMockMode,
    });
}
