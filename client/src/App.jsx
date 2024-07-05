import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import axios from 'axios';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = () => {
        axios.get(`${window.location.origin}/tasks`)
            .then(response => setTasks(response.data))
            .catch(error => console.error(error));
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const addTask = (newTask) => {
        setTasks([...tasks, newTask]);
    };

    const updateTask = (updatedTask) => {
        setTasks(tasks.map(task => (task._id === updatedTask._id ? updatedTask : task)));
    };

    const deleteTask = (taskId) => {
        setTasks(tasks.filter(task => task._id !== taskId));
    };

    return (
        <div className="page-wrapper">
            <div className="container">
                <div className="content-wrapper">
                    <div className="left">
                        <TaskForm addTask={addTask} />
                    </div>
                    <div className="right">
                        <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
