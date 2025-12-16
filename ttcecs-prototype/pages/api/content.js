import dbConnect from '../../lib/dbConnect';
import SiteContent from '../../models/SiteContent';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            await dbConnect();

            // Fetch the single document for site content
            // We use sort by _id to consistently get the "latest" or first created if multiple
            const content = await SiteContent.findOne().sort({ createdAt: -1 });

            if (!content) {
                // Return default/fallback if db is empty
                return res.status(200).json({
                    interestRate: 14.4, // Fallback
                    isMemberPortalEnabled: false,
                    isElectionNotificationEnabled: true,
                    isNewsNotificationEnabled: true,
                    news: [],
                    electionNotifications: []
                });
            }

            res.status(200).json(content);
        } catch (error) {
            console.error('Error reading site content:', error);
            res.status(500).json({ message: 'Error reading site content' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
