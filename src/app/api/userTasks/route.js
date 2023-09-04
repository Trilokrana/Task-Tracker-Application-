
import connectDB from '../../db';

connectDB();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { task } = req.body;

      const newTask = await YourTaskModel.create({ task });

      res.status(201).json(newTask);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
