const fetch = require('node-fetch');

const BASE_URL = process.env.UNIT4_BASE_URL;
const COMPANY_ID = process.env.UNIT4_COMPANY_ID;
const REPORT_ID = process.env.UNIT4_REPORT_ID;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });

  try {
    const url = `${BASE_URL}/v1/informationbrowser/reports/${REPORT_ID}/format?companyId=${COMPANY_ID}`;

    const unit4Res = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/json'
      }
    });

    if (unit4Res.status === 401 || unit4Res.status === 403) {
      return res.status(401).json({ valid: false });
    }

    res.status(200).json({ valid: true });
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', detail: err.message });
  }
};
