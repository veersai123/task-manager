import React, { useState } from 'react';
import axios from 'axios';
import './TaskForm.css';

const TaskForm = ({ addTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if any field is empty
        if (!title || !description || !dueDate) {
            setError('Please fill in all fields.');
            return;
        }

        axios.post(`${window.location.origin}/tasks`, {
            title,
            description,
            dueDate
        }).then(response => {
            addTask(response.data);
            setTitle('');
            setDescription('');
            setDueDate('');
            setError('');
        }).catch(error => console.error(error));
    };

    return (
        <div className="container">
            <h1>Task Management Application</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                ></textarea>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <button type="submit">Add Task</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
};

export default TaskForm;
