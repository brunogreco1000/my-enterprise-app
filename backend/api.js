// backend/api.ts
import server from './server';

export default function handler(req: any, res: any) {
  server(req, res);
}
