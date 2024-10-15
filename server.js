import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 5001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// API routes
app.get('/api/emailCampaigns', async (req, res) => {
  try {
    const emailCampaigns = await prisma.emailCampaign.findMany();
    res.json(emailCampaigns);
  } catch (error) {
    console.error('Error fetching email campaigns:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/emailCampaigns', async (req, res) => {
  try {
    const { campaignName, totalEmailsSent, openRate, clickRate, bounceRate } = req.body;
    const newEmailCampaign = await prisma.emailCampaign.create({
      data: {
        campaignName,
        totalEmailsSent,
        openRate,
        clickRate,
        bounceRate,
      },
    });
    res.status(201).json(newEmailCampaign);
  } catch (error) {
    console.error('Error creating email campaign:', error);
    res.status(400).json({ error: 'Error processing email campaign data' });
  }
});

// New endpoint for Kixie data
app.get('/api/kixieData', async (req, res) => {
  try {
    const kixieApiKey = process.env.KIXIE_API_KEY;
    const kixieResponse = await fetch(`https://api.kixie.com/v1/calls?api_key=${kixieApiKey}`);
    const kixieData = await kixieResponse.json();

    // Process the Kixie data as needed
    const processedData = {
      totalCalls: kixieData.total_calls,
      connectedCalls: kixieData.connected_calls,
      averageCallDuration: kixieData.average_duration,
    };

    res.json(processedData);
  } catch (error) {
    console.error('Error fetching Kixie data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// New endpoint for Jotform submission data
app.get('/api/jotformData', async (req, res) => {
  try {
    const jotformApiKey = process.env.JOTFORM_API_KEY;
    const jotformResponse = await fetch(`https://api.jotform.com/user/forms?apiKey=${jotformApiKey}`);
    const jotformData = await jotformResponse.json();

    // Process the Jotform data as needed
    const processedData = {
      totalSubmissions: jotformData.content.reduce((sum, form) => sum + form.count, 0),
      completionRate: jotformData.content.reduce((sum, form) => sum + form.status, 0) / jotformData.content.length,
      averageSubmissionTime: jotformData.content.reduce((sum, form) => sum + form.new, 0) / jotformData.content.length,
    };

    res.json(processedData);
  } catch (error) {
    console.error('Error fetching Jotform data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});