import express from 'express';
import EmailCampaign from '../models/emailCampaign.model.js';

const router = express.Router();

// Get all email campaigns
router.get('/', async (req, res) => {
  try {
    const emailCampaigns = await EmailCampaign.find();
    res.json(emailCampaigns);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Add new email campaign
router.post('/add', async (req, res) => {
  const newEmailCampaign = new EmailCampaign(req.body);

  try {
    await newEmailCampaign.save();
    res.json('Email campaign added!');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

export default router;