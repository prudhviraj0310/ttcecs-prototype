import mongoose from 'mongoose';

const SiteContentSchema = new mongoose.Schema({
    interestRate: { type: Number, required: true },
    isMemberPortalEnabled: { type: Boolean, default: false },
    isElectionNotificationEnabled: { type: Boolean, default: true },
    isNewsNotificationEnabled: { type: Boolean, default: true },
    scrollingNews: { type: String, required: true },
    news: [{
        id: Number,
        category: String,
        title: String,
        excerpt: String,
        icon: String,
        color: String,
        date: String
    }],
    electionNotifications: [{
        title: String,
        date: String,
        file: String,
        type: { type: String },
        desc: String
    }],
    branches: [{
        name: String,
        shortName: String,
        address: String,
        phone: String,
        email: String,
        mapEmbed: String,
        mapLink: String
    }]
}, { timestamps: true });

export default mongoose.models.SiteContent || mongoose.model('SiteContent', SiteContentSchema);
