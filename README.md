# Unit4 Budget Dashboard

Dashboard externo para visualização e edição de budget lines do Unit4 Planner.

## Stack
- **Frontend**: HTML/CSS/JS puro (sem framework)
- **Backend**: Vercel Serverless Functions (Node.js)
- **API**: Unit4 Information Browser REST API

## Deploy na Vercel (passo a passo)

### 1. Instalar a Vercel CLI
```bash
npm install -g vercel
```

### 2. Fazer login na Vercel
```bash
vercel login
```

### 3. Deploy
Na pasta do projecto:
```bash
vercel
```

Segue as instruções no terminal:
- Project name: `unit4-budget-dashboard`
- Framework: Other
- Root directory: `.`

### 4. Configurar variáveis de ambiente na Vercel

No dashboard da Vercel (vercel.com), vai ao teu projecto → Settings → Environment Variables e adiciona:

| Nome | Valor |
|---|---|
| `UNIT4_BASE_URL` | `https://ubw-accept01.unit4cloud.com/us_pah_acpt_webapi` |
| `UNIT4_COMPANY_ID` | `PC` |
| `UNIT4_REPORT_ID` | `1709` |

### 5. Re-deploy após variáveis
```bash
vercel --prod
```

## Estrutura do projecto
```
unit4-dashboard/
├── api/
│   ├── auth.js          → valida credenciais Unit4
│   ├── budget.js        → lê budget lines (POST com filtros)
│   └── budget-count.js  → conta total de linhas para paginação
├── public/
│   └── index.html       → frontend completo
├── package.json
└── vercel.json
```

## API Endpoints internos
- `GET /api/auth` — valida Basic Auth contra Unit4
- `POST /api/budget` — body: `{ project, page, pageSize, version? }`
- `POST /api/budget-count` — body: `{ project, version? }`

## Nota sobre escrita (write-back)
A leitura está 100% funcional via Information Browser API (reportId: 1709).
A escrita ainda não tem endpoint REST no Unit4 desta instalação.
O código está preparado para receber o endpoint quando disponível —
ver função `confirmSave()` no index.html.

## Desenvolvimento local
```bash
npm install -g vercel
vercel dev
```
Abre em: http://localhost:3000
