import React from 'react';
import Task from './Task';
import './TaskList.css';

const TaskList = ({ tasks = [], updateTask, deleteTask }) => {
    return (
        <div className="container">
            <h1>Task List</h1>
            <div className="task-list">
                {Array.isArray(tasks) && tasks.map(task => (
                    <Task key={task._id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
                ))}
            </div>
        </div>
    );
};

export default TaskList;

