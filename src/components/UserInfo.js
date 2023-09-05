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
      return !task.Delete == taskToDelete;
      //!task.Delete;
    }));
    

    /*try {
      await fetch("/api/userTasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: taskToDelete, Delete: true }),
      });
    } catch (error) {
      console.error("Error updating task status:", error);
    }*/
  }

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
              <button className={styles.btn} id="complete" onClick={() => { completeTask(val.task) }}>completed</button>
              <button className={styles.btn} id="del" onClick={() => { deleteTask(val.task) }}>Delete</button>
              {val.completed ? <h1>Task Completed</h1> : <h2> Task not Completed</h2>}
            </div>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
