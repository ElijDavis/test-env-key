import express from "express";
const app = express();
const port = process.env.PORT || 3000;

// Express endpoint to check runtime variables via JSON
app.get("/api/health", (req, res) => {
  res.json({
    status: "active",
    databaseUrlConfigured: !!process.env.DATABASE_URL,
    apiKeySnippet: process.env.API_KEY ? `${process.env.API_KEY.slice(0, 3)}...` : "NOT_FOUND",
    timestamp: new Date().toISOString()
  });
});

// Main dashboard HTML view
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Klade Environment Sync Test</title>
        <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #0f172a; color: #f8fafc; padding: 40px; display: flex; justify-content: center; }
            .card { background: #1e293b; padding: 32px; border-radius: 12px; width: 100%; max-width: 500px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border: 1px solid #334155; }
            h1 { font-size: 20px; margin-bottom: 24px; color: #38bdf8; }
            .status-item { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #334155; }
            .status-item:last-child { border: none; }
            .badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; font-family: monospace; }
            .badge.success { background: #065f46; color: #34d399; }
            .badge.fail { background: #7f1d1d; color: #f87171; }
            .val { font-family: monospace; color: #cbd5e1; }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>🚀 Klade Environment Var Test</h1>
            
            <div class="status-item">
                <span>DATABASE_URL Status:</span>
                <span class="badge ${process.env.DATABASE_URL ? 'success' : 'fail'}">
                    ${process.env.DATABASE_URL ? 'CONNECTED' : 'MISSING'}
                </span>
            </div>

            <div class="status-item">
                <span>DATABASE_URL Value:</span>
                <span class="val">${process.env.DATABASE_URL || 'undefined'}</span>
            </div>
            
            <div class="status-item">
                <span>API_KEY Decrypted Value:</span>
                <span class="val">${process.env.API_KEY || 'undefined'}</span>
            </div>
        </div>
    </body>
    </html>
  `);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`🚀 Test server running smoothly on port ${port}`);
});

//for push test of env var.
//Test auto env var puller.