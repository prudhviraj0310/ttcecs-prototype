import dbConnect from '../../../lib/dbConnect';
import Member from '../../../models/Member';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
        return res.status(400).json({ message: 'Phone number and OTP are required' });
    }

    // Verify OTP
    // For demo, accept '123456'
    if (otp !== '123456') {
        return res.status(401).json({ message: 'Invalid OTP' });
    }

    try {
        await dbConnect();

        // Get user details
        const user = await Member.findOne({ Mobile_No: phoneNumber });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user info
        return res.status(200).json({
            message: 'Login successful',
            user: user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
