import React, { useState } from 'react';
import { API_BASE_URL } from '../config';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error on form submission
        setSuccessMessage(''); // Reset success message on form submission
    
        try {
            const response = await fetch(`${API_BASE_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        mutation {
                            signup(username: "${username}", email: "${email}", password: "${password}") {
                                id
                                username
                                email
                            }
                        }
                    `,
                }),
            });
    
            const data = await response.json();
            console.log('API Response:', data); // Debugging line
    
            if (data.errors) {
                setError(data.errors[0].message); // Handle GraphQL errors
            } else if (data.data && data.data.signup) {
                setSuccessMessage('Sign Up successful!'); // Show success message
                console.log('New User:', data.data.signup); // Log the new user data
                setUsername('');
                setEmail('');
                setPassword('');
            } else {
                setError('Unexpected response structure'); // Handle unexpected response
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setError('An error occurred while signing up.'); // Handle fetch errors
        }
    };
    
    

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-5">
            <div className="max-w-md w-full bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-600">
                <h1 className="text-4xl font-bold text-white mb-4 text-center">HSi TaskMaster</h1>
                <h2 className="text-2xl font-bold text-white mb-4">Sign Up</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                            required
                        />
                    </div>
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
                        Sign Up
                    </button>
                </form>
                <p className="text-center text-gray-300 mt-4">
                    Already have an account?{' '}
                    <Link to="/" className="text-blue-400 hover:underline">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
