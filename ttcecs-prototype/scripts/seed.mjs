
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import mockDb from '../lib/mockDb.js'; // Ensure extension is present
import Member from '../models/Member.js';
import FixedDeposit from '../models/FixedDeposit.js';
import DayBook from '../models/DayBook.js';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined in .env.local');
    process.exit(1);
}

async function seed() {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected');

        console.log('Clearing existing data...');
        await Member.deleteMany({});
        await FixedDeposit.deleteMany({});
        await DayBook.deleteMany({});

        console.log('Seeding Members...');
        await Member.insertMany(mockDb.MMB_mas_Members);

        console.log('Seeding Fixed Deposits...');
        await FixedDeposit.insertMany(mockDb.mmb_mas_FixedDeposit);

        console.log('Seeding DayBook Transactions...');
        await DayBook.insertMany(mockDb.MMB_DayBook);

        console.log('✅ Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

seed();
