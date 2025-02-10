import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() === '') return;
    const newTask = {
      id: Date.now(),
      text: input,
      completed: false
    };
    setTasks([newTask, ...tasks]);
    setInput('');
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAddTask();
          }}
          placeholder="Add a new task..."
          className="input"
        />
        <button onClick={handleAddTask} className="button">Add</button>
      </div>

      <ul className="list">
        {tasks.map((task) => (
          <li key={task.id} className="list-item">
            <span
              onClick={() => handleToggleTask(task.id)}
              className="task-text"
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'gray' : 'black',
                cursor: 'pointer',
              }}
            >
              {task.text}
            </span>
            <button onClick={() => handleDeleteTask(task.id)} className="delete-button">
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
