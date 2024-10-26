import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import { Link, useNavigate} from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch(`${API_BASE_URL}/graphql`, {  // Ensure correct endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        mutation {
                            login(email: "${email}", password: "${password}") {
                                token
                            }
                        }
                    `,
                }),
            });

            // Check if the response is okay (status code 200-299)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Check if there are GraphQL errors
            if (data.errors) {
                setMessage('Error logging in: ' + data.errors[0].message);
            } else {
                const token = data.data.login.token;
                localStorage.setItem('token', token);
                setMessage('Login successful!');
                setEmail('');
                setPassword('');
                navigate('/tasks');
            }
        } catch (error) {
            // Handle network errors and any other unexpected errors
            setMessage('Error logging in: ' + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-5">
            <div className="max-w-md w-full bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-600">
                <h1 className="text-4xl font-bold text-white mb-4 text-center">HSi TaskMaster</h1>
                <h2 className="text-2xl font-bold text-white mb-4">Sign In</h2>
                {message && <p className="text-red-500 mb-4">{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-center text-gray-300 mt-4">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-400 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
