import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';

const TaskHome = () => {
    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [taskDeadline, setTaskDeadline] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    // Fetch tasks from the database
    const fetchTasks = async () => {
        const response = await fetch(`${API_BASE_URL}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    query {
                        tasks {
                            id
                            name
                            description
                            deadline
                        }
                    }
                `,
            }),
        });
        const data = await response.json();
        if (data.data && data.data.tasks) {
            setTasks(data.data.tasks);
        }
    };

    // Call fetchTasks when the component mounts
    useEffect(() => {
        fetchTasks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`${API_BASE_URL}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        createTask(name: "${taskName}", description: "${taskDescription}", deadline: "${taskDeadline}", userId: "YOUR_USER_ID") {
                            id
                            name
                            description
                            deadline
                        }
                    }
                `,
            }),
        });
        const data = await response.json();
        if (data.data && data.data.createTask) {
            // Update the tasks state with the new task
            setTasks([...tasks, data.data.createTask]);
            // Clear the input fields
            setTaskName('');
            setTaskDescription('');
            setTaskDeadline('');
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Hello UserName</h1>
            <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4 p-2 border border-gray-600 rounded"
            />
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    placeholder="Task Name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    required
                    className="block w-full p-2 mb-2 border border-gray-600 rounded"
                />
                <textarea
                    placeholder="Task Description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    required
                    className="block w-full p-2 mb-2 border border-gray-600 rounded"
                />
                <input
                    type="date"
                    value={taskDeadline}
                    onChange={(e) => setTaskDeadline(e.target.value)}
                    className="block w-full p-2 mb-2 border border-gray-600 rounded"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded">
                    Add Task
                </button>
            </form>
            <h2 className="text-xl font-bold mb-2">Tasks:</h2>
            <ul>
                {tasks.filter(task => task.name.toLowerCase().includes(searchTerm.toLowerCase())).map((task) => (
                    <li key={task.id} className="mb-2">
                        <h3 className="font-bold">{task.name}</h3>
                        <p>{task.description}</p>
                        <p>{task.deadline}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskHome;
