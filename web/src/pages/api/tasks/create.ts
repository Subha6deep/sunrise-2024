import { createTask } from '@/modules/taskManager';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, description, persona, group } = req.body;
    createTask(title, description, persona, group);
    res.status(200).json({ message: 'Task created successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
