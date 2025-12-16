import dbConnect from '../../lib/dbConnect';
import Member from '../../models/Member';
import FixedDeposit from '../../models/FixedDeposit';
import DayBook from '../../models/DayBook';
import SiteContent from '../../models/SiteContent';
import mockDb from '../../lib/mockDb';

// Import Site Content Data directly to ensure it is bundled
import siteContentData from '../../data/site-content.json';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        await dbConnect();

        // Optional: Add a simple secret check if needed later
        // const { secret } = req.query;
        // if (secret !== process.env.SEED_SECRET) return res.status(401).json({ message: 'Unauthorized' });

        console.log('🌱 Starting Database Seed via API...');

        // Clear existing data
        await Promise.all([
            Member.deleteMany({}),
            FixedDeposit.deleteMany({}),
            DayBook.deleteMany({}),
            SiteContent.deleteMany({})
        ]);

        // Insert Mock Data
        await Member.insertMany(mockDb.MMB_mas_Members);
        await FixedDeposit.insertMany(mockDb.mmb_mas_FixedDeposit);
        await DayBook.insertMany(mockDb.MMB_DayBook);

        // Insert Site Content
        if (siteContentData) {
            // Add default flags if missing in JSON
            const contentToInsert = {
                ...siteContentData,
                isMemberPortalEnabled: siteContentData.isMemberPortalEnabled ?? false,
                isElectionNotificationEnabled: siteContentData.isElectionNotificationEnabled ?? true,
                isNewsNotificationEnabled: siteContentData.isNewsNotificationEnabled ?? true
            };
            await SiteContent.create(contentToInsert);
        }

        console.log('✅ Database seeded successfully');
        return res.status(200).json({
            message: 'Database seeded successfully',
            stats: {
                members: mockDb.MMB_mas_Members.length,
                fixedDeposits: mockDb.mmb_mas_FixedDeposit.length,
                siteContent: 1
            }
        });

    } catch (error) {
        console.error('❌ Seeding failed:', error);
        return res.status(500).json({
            message: 'Seeding failed',
            error: error.message
        });
    }
}
