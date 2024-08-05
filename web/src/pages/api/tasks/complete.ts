import { completeTask } from '@/modules/taskManager';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { taskTitle } = req.body;
    completeTask(taskTitle);
    res.status(200).json({ message: 'Task completed successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
