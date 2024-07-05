import React, { useState } from 'react';
import axios from 'axios';
import './Task.css'
const Task = ({ task, updateTask, deleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(task.dueDate);

    const handleUpdate = () => {
        axios.put(`${window.location.origin}/tasks/${task._id}`, {
            title,
            description,
            dueDate
        }).then(response => {
            updateTask(response.data);
            setIsEditing(false);
        }).catch(error => console.error(error));
    };

    const handleDelete = () => {
        axios.delete(`${window.location.origin}/tasks/${task._id}`)
            .then(() => {
                deleteTask(task._id);
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="task">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                    <div className="task-buttons">
                        <button className="update" onClick={handleUpdate}>Save</button>
                        <button className="delete" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="task-title">{task.title}</div>
                    <div className="task-desc">{task.description}</div>
                    <div className="task-date">{new Date(task.dueDate).toLocaleDateString()}</div>
                    <div className="task-buttons">
                        <button className="update" onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="delete" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Task;
