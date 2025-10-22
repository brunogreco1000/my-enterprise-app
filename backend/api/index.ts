// api/index.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import server from '../server'; // importa tu Express app

export default function handler(req: VercelRequest, res: VercelResponse) {
  server(req, res);
}
