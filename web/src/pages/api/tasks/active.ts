import { getActiveTasks } from '@/modules/taskManager';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tasks = getActiveTasks();
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
