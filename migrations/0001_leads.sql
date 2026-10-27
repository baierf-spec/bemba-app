-- Leads from safari quote requests and other forms.
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  kind TEXT NOT NULL,              -- 'safari' | 'contact'
  name TEXT,
  email TEXT NOT NULL,
  destination TEXT,
  travel_month TEXT,
  travellers INTEGER,
  budget TEXT,
  message TEXT,
  page TEXT,                       -- page the form was sent from
  country TEXT,                    -- visitor country from Cloudflare (request.cf.country)
  status TEXT NOT NULL DEFAULT 'new'
);

CREATE INDEX IF NOT EXISTS leads_created ON leads(created_at);
