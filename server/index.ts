import express from 'express';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { handleContact } from './contact';

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(express.json({ limit: '32kb' }));

app.post('/api/contact', handleContact);

// In production, serve the built SPA and let client routing handle the rest.
if (process.env.NODE_ENV === 'production') {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const dist = path.resolve(here, '../dist');
  app.use(express.static(dist));
  app.use((_req, res) => {
    res.sendFile(path.join(dist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[val-des-cedres] server listening on :${PORT}`);
});
