import { updateTask } from '@/modules/taskManager';
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { taskId, updatedTask } = req.body;
    updateTask(taskId, updatedTask);
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
