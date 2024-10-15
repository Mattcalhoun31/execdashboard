import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const emailCampaignSchema = new Schema({
  campaignName: { type: String, required: true },
  totalEmailsSent: { type: Number, required: true },
  openRate: { type: Number, required: true },
  clickRate: { type: Number, required: true },
  bounceRate: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const EmailCampaign = mongoose.model('EmailCampaign', emailCampaignSchema);

export default EmailCampaign;