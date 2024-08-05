import { deleteTask } from '@/modules/taskManager';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { taskId } = req.body;
    deleteTask(taskId);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
