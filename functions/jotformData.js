const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const jotformApiKey = process.env.JOTFORM_API_KEY;
    const apiUrl = 'https://api.jotform.com/user/forms';

    const response = await fetch(`${apiUrl}?apiKey=${jotformApiKey}`);
    const data = await response.json();

    if (data.responseCode !== 200) {
      throw new Error('Failed to fetch Jotform data');
    }

    const forms = data.content;

    let totalSubmissions = 0;
    let totalViews = 0;
    let conversionRate = 0;

    for (const form of forms) {
      totalSubmissions += form.count;
      totalViews += form.views;
    }

    if (totalViews > 0) {
      conversionRate = (totalSubmissions / totalViews) * 100;
    }

    const processedData = {
      totalForms: forms.length,
      totalSubmissions,
      totalViews,
      conversionRate: conversionRate.toFixed(2),
    };

    return {
      statusCode: 200,
      body: JSON.stringify(processedData)
    };
  } catch (error) {
    console.error('Error fetching Jotform data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};