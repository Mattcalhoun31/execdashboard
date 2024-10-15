import React, { useState } from 'react';
import { sendWebhookData } from '../api/dataFetcher';

interface WebhookSimulatorProps {
  onWebhookReceived: (data: any) => void;
}

const WebhookSimulator: React.FC<WebhookSimulatorProps> = ({ onWebhookReceived }) => {
  const [webhookUrl, setWebhookUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Webhook URL to provide to Reachinbox:', webhookUrl);

    const simulatedWebhookData = {
      campaignId: 'CAMP_' + Math.random().toString(36).substr(2, 9),
      eventType: 'email_opened',
      timestamp: new Date().toISOString(),
      recipientEmail: 'user@example.com',
    };

    await sendWebhookData(simulatedWebhookData);
    onWebhookReceived(simulatedWebhookData);
  };

  // ... rest of the component remains the same
};

export default WebhookSimulator;