import { connectMongoDB } from "@/lib/mongodb";
import Task from "@/models/task";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { task, completed } = await req.json();
    await connectMongoDB();
    await Task.create({ task, completed });

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while adding the task." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const tasks = await Task.find(); 

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while fetching tasks." },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { task, completed } = await req.json();
    await connectMongoDB();

    
    const updatedTask = await Task.findOneAndUpdate(
      { task },
      { completed },
      { new: true } 
    );

    if (!updatedTask) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while updating the task." },
      { status: 500 }
    );
  }
}