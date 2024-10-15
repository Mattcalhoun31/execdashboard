const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  try {
    const kixieApiKey = process.env.KIXIE_API_KEY;
    const kixieBusinessId = process.env.KIXIE_BUSINESS_ID;

    const kixieResponse = await fetch('https://apig.kixie.com/app/v1/api/getWebhooks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        apikey: kixieApiKey,
        businessid: kixieBusinessId,
        call: 'getWebhooks'
      })
    });

    const kixieData = await kixieResponse.json();

    // Process the Kixie webhook data
    const processedData = {
      totalWebhooks: kixieData.webhooks.length,
      webhookTypes: kixieData.webhooks.reduce((types, webhook) => {
        types[webhook.eventname] = (types[webhook.eventname] || 0) + 1;
        return types;
      }, {}),
    };

    return {
      statusCode: 200,
      body: JSON.stringify(processedData)
    };
  } catch (error) {
    console.error('Error fetching Kixie data:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};