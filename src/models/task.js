
import mongoose, { Schema, models } from "mongoose";

const taskSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Task = models.Task || mongoose.model("Task", taskSchema);

export default Task;