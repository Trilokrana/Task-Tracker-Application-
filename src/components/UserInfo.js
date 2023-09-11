"use client";
import React, { useState, useRef } from "react";
import styles from '@/styles/app.module.css'

function App() {
  const [todoList, setTodoList] = useState([]);
  const [currentTask, setCurrentTask] = useState("");
  const inputTask = useRef(null);

  const addTask = async () => {
    setTodoList([...todoList, { task: currentTask, completed: false }]);
    setCurrentTask("");
    inputTask.current.value = "";

    try {
      const response = await fetch("/api/userTasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: currentTask }),
      });

      if (response.status === 201) {
        const newTask = await response.json();
        setTodoList([...todoList, newTask]);
        setCurrentTask("");
        inputTask.current.value = "";
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const deleteTask = async (taskToDelete) => {
    setTodoList(todoList.filter((task) => {
      return task.task !== taskToDelete;
    }));

    try {
      const response = await fetch("/api/userTasks", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: taskToDelete, completed: false }),
      });

      if (response.status === 200) {
        console.log("Task deleted from the database.");
      } else {
        console.error("Error deleting task from the database.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };


  const completeTask = async (taskToComplete) => {
    const updatedTodoList = todoList.map((task) => {
      return task.task === taskToComplete
        ? { ...task, completed: true }
        : task;
    });

    setTodoList(updatedTodoList);

    try {
      await fetch("/api/userTasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: taskToComplete, completed: true }),
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };
  return (
    <div className={styles.App}>
      <div className={styles.taskbar}>
        <h1>Task List</h1>
        <input className={styles.input}
          ref={inputTask}
          type="text"
          placeholder="Task......"
          onKeyDown={(event) => {
            if (event.keyCode == 13) {
              addTask()
            }
          }}
          onChange={(e) => setCurrentTask(e.target.value)}
          value={currentTask}
        />
        <button className={styles.button} onClick={addTask}>Add Task</button>
      </div>
      <ul className={styles.ul}>
        {todoList.map((val, key) => {
          return (
            <div className={styles.task} id="task" key={key}>
              <li className={styles.li}>{val.task}</li>
              <div className={styles.completed}>
                <button className={styles.btn} id="complete" onClick={() => { completeTask(val.task) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
              <div className={styles.delete}>
                <button id="del" onClick={() => { deleteTask(val.task) }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
              {val.completed ? <h1>Task Completed</h1> : <h2> Task not Completed</h2>}
            </div>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
