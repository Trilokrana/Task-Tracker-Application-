
import dbConnect from "../../db";
import Task from "../../model/task";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const task = new Task({ task: req.body.task });
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: "Error creating task" });
    }
  } else if (req.method === "GET") {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Error fetching tasks" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
