import dbConnect from '../../../lib/dbConnect';
import Member from '../../../models/Member';
import FixedDeposit from '../../../models/FixedDeposit';
import DayBook from '../../../models/DayBook';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { phoneNumber } = req.query;

    if (!phoneNumber) {
        return res.status(400).json({ message: 'Phone number is required' });
    }

    try {
        await dbConnect();

        // Find user
        const user = await Member.findOne({ Mobile_No: phoneNumber });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get FDs
        // Note: Using find({ fdMNo: user.MNo }) assuming MNo is the link
        const fds = await FixedDeposit.find({ fdMNo: user.MNo });

        // Get Transactions
        // Note: Using find({ dbEDPNo: user.MNo }) assuming EDPNo matches MNo
        const transactions = await DayBook.find({ dbEDPNo: user.MNo });

        return res.status(200).json({
            user,
            fds,
            transactions
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
