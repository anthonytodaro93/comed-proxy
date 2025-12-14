// api/index.js

export default async function handler(req, res) {
  try {
    const response = await fetch('https://hourlypricing.comed.com/api?type=5minutefeed');
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch from ComEd' });
    }

    const data = await response.json();

    // Add CORS headers so your app can access it
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    res.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Proxy server error' });
  }
}

// Required for Vercel serverless functions
export const config = {
  api: {
    bodyParser: false,
  },
};
