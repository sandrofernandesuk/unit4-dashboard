const fetch = require('node-fetch');

const BASE_URL = process.env.UNIT4_BASE_URL;
const COMPANY_ID = process.env.UNIT4_COMPANY_ID;
const REPORT_ID = process.env.UNIT4_REPORT_ID;

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Missing Authorization header' });

  const { project, page = 1, pageSize = 50, version } = req.body || {};
  if (!project) return res.status(400).json({ error: 'project is required' });

  const filters = [
    {
      publicPath: 'cat1Extended/project',
      operator: '=',
      valueFrom: { value: project, isMacro: false }
    }
  ];

  if (version) {
    filters.push({
      publicPath: 'version',
      operator: '=',
      valueFrom: { value: version, isMacro: false }
    });
  }

  try {
    const url = `${BASE_URL}/v1/informationbrowser/reports/${REPORT_ID}/results?companyId=${COMPANY_ID}&page=${page}&pageSize=${pageSize}`;

    const unit4Res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(filters)
    });

    const data = await unit4Res.json();

    if (!unit4Res.ok) {
      return res.status(unit4Res.status).json({ error: 'Unit4 API error', detail: data });
    }

    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ error: 'Proxy error', detail: err.message });
  }
};
