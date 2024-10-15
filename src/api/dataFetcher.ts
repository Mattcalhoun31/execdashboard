const API_URL = '/.netlify/functions';

export interface EmailCampaignData {
  id?: number;
  campaignName: string;
  totalEmailsSent: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  timestamp?: string;
}

export interface KixieData {
  totalWebhooks: number;
  webhookTypes: {
    [key: string]: number;
  };
}

export interface JotformData {
  totalForms: number;
  totalSubmissions: number;
  totalViews: number;
  conversionRate: string;
}

export const fetchEmailCampaignData = async (): Promise<EmailCampaignData[]> => {
  const response = await fetch(`${API_URL}/emailCampaigns`);
  if (!response.ok) {
    throw new Error('Failed to fetch email campaign data');
  }
  return response.json();
};

export const addEmailCampaignData = async (data: EmailCampaignData): Promise<EmailCampaignData> => {
  const response = await fetch(`${API_URL}/emailCampaigns`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to add email campaign data');
  }
  return response.json();
};

export const fetchKixieData = async (): Promise<KixieData> => {
  const response = await fetch(`${API_URL}/kixieData`);
  if (!response.ok) {
    throw new Error('Failed to fetch Kixie data');
  }
  return response.json();
};

export const fetchJotformData = async (): Promise<JotformData> => {
  const response = await fetch(`${API_URL}/jotformData`);
  if (!response.ok) {
    throw new Error('Failed to fetch Jotform data');
  }
  return response.json();
};