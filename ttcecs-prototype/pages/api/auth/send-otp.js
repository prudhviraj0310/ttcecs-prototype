
import dbConnect from '../../../lib/dbConnect';
import Member from '../../../models/Member';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { phoneNumber } = req.body;

    if (!phoneNumber) {
        return res.status(400).json({ message: 'Phone number is required' });
    }

    await dbConnect();

    // Check if user exists in MongoDB
    const user = await Member.findOne({ Mobile_No: phoneNumber });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // In a real app, generate a random OTP and send via SMS.
    // For this demo, we'll return a fixed OTP or just success.
    // We'll simulate sending by just returning success.
    // The client side demo can use a fixed OTP like '123456'.

    console.log(`Sending OTP to ${phoneNumber} for user ${user.Name}`);

    return res.status(200).json({
        message: 'OTP sent successfully',
        // For demo purposes only, we might want to send the OTP back if we want to auto-fill it
        // But typically we don't. We'll just assume 123456 is the OTP.
    });
}
