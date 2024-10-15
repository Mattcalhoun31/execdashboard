import { useState, useEffect } from 'react';
import { Mail, Percent, MousePointer, XCircle, Webhook, FileText, Eye, BarChart } from 'lucide-react';
import KPICard from './components/KPICard';
import Header from './components/Header';
import EmailCampaignInput from './components/EmailCampaignInput';
import { 
  fetchEmailCampaignData, 
  addEmailCampaignData, 
  fetchKixieData,
  fetchJotformData,
  EmailCampaignData,
  KixieData,
  JotformData
} from './api/dataFetcher';

function App() {
  const [emailCampaignData, setEmailCampaignData] = useState<EmailCampaignData[]>([]);
  const [kixieData, setKixieData] = useState<KixieData | null>(null);
  const [jotformData, setJotformData] = useState<JotformData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [emailData, kixieResult, jotformResult] = await Promise.all([
          fetchEmailCampaignData(),
          fetchKixieData(),
          fetchJotformData()
        ]);
        setEmailCampaignData(emailData);
        setKixieData(kixieResult);
        setJotformData(jotformResult);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEmailCampaignSubmit = async (data: EmailCampaignData) => {
    try {
      const newCampaign = await addEmailCampaignData(data);
      setEmailCampaignData(prevData => [...prevData, newCampaign]);
    } catch (error) {
      console.error('Failed to add email campaign data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Executive Dashboard</h1>
        <EmailCampaignInput onSubmit={handleEmailCampaignSubmit} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* Email Campaign KPIs */}
          {emailCampaignData.length > 0 && (
            <>
              <KPICard 
                icon={<Mail className="w-8 h-8 text-blue-500" />} 
                title="Total Emails Sent" 
                value={emailCampaignData.reduce((sum, campaign) => sum + campaign.totalEmailsSent, 0)} 
              />
              <KPICard 
                icon={<Percent className="w-8 h-8 text-green-500" />} 
                title="Avg Open Rate" 
                value={`${(emailCampaignData.reduce((sum, campaign) => sum + campaign.openRate, 0) / emailCampaignData.length).toFixed(2)}%`} 
              />
              <KPICard 
                icon={<MousePointer className="w-8 h-8 text-yellow-500" />} 
                title="Avg Click Rate" 
                value={`${(emailCampaignData.reduce((sum, campaign) => sum + campaign.clickRate, 0) / emailCampaignData.length).toFixed(2)}%`} 
              />
              <KPICard 
                icon={<XCircle className="w-8 h-8 text-red-500" />} 
                title="Avg Bounce Rate" 
                value={`${(emailCampaignData.reduce((sum, campaign) => sum + campaign.bounceRate, 0) / emailCampaignData.length).toFixed(2)}%`} 
              />
            </>
          )}

          {/* Kixie KPIs */}
          {kixieData && (
            <>
              <KPICard 
                icon={<Webhook className="w-8 h-8 text-purple-500" />} 
                title="Total Webhooks" 
                value={kixieData.totalWebhooks} 
              />
              {Object.entries(kixieData.webhookTypes).map(([type, count]) => (
                <KPICard 
                  key={type}
                  icon={<Webhook className="w-8 h-8 text-blue-500" />} 
                  title={`${type} Webhooks`} 
                  value={count} 
                />
              ))}
            </>
          )}

          {/* Jotform KPIs */}
          {jotformData && (
            <>
              <KPICard 
                icon={<FileText className="w-8 h-8 text-indigo-500" />} 
                title="Total Forms" 
                value={jotformData.totalForms} 
              />
              <KPICard 
                icon={<BarChart className="w-8 h-8 text-green-500" />} 
                title="Total Submissions" 
                value={jotformData.totalSubmissions} 
              />
              <KPICard 
                icon={<Eye className="w-8 h-8 text-blue-500" />} 
                title="Total Views" 
                value={jotformData.totalViews} 
              />
              <KPICard 
                icon={<Percent className="w-8 h-8 text-yellow-500" />} 
                title="Conversion Rate" 
                value={`${jotformData.conversionRate}%`} 
              />
            </>
          )}
        </div>

        {emailCampaignData.length === 0 && !kixieData && !jotformData && (
          <p className="text-center mt-8">No data available. Add some email campaign data using the form above or check your API connections.</p>
        )}
      </main>
    </div>
  );
}

export default App;