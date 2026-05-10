import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    

    const handleLogin = async (e) => {
        e.preventDefault(); setError('');
        
        try {
            const response = await api.post('/login', { email, password });
            const userRole = response.data.user.role;
            const userId = response.data.user.id;
            
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('userName', response.data.user.name);
            localStorage.setItem('userId', userId); // <-- ДОДАЛИ ЦЕ!
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            if (userRole === 'Admin' || userRole === 'admin') {
                window.location.href = '/users'; // <-- Оновлює сторінку і кидає в адмінку
            } else {
                window.location.href = `/users/${userId}`; // <-- Оновлює сторінку і кидає в кабінет
            }
        // eslint-disable-next-line no-unused-vars
        } catch (err) {
            setError('Невірний email або пароль');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center text-indigo-900 mb-6">
                    Вхід у систему
                </h1>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Пароль
                        </label>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        Немає акаунту? <Link to="/register" className="text-blue-600 hover:text-blue-500 font-medium">Зареєструватися</Link>
                    </p>

                    <button 
                        type="submit" 
                        className="w-full py-3 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Увійти
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;