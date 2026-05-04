import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const UserCreate = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('User');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); setError('');
        const newUser = { name, email, role, password };
        try {
            await api.post('/users', newUser);
            navigate('/users');
        } catch {
            setError('Помилка при створенні користувача');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-indigo-900">Новий користувач</h1>
                    <Link to="/users" className="text-gray-500 hover:text-indigo-900 transition-colors">
                        ✕ Скасувати
                    </Link>
                </div>
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Ім'я</label>
                        <input
                            type="text"
                            required value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Іван Іванов" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input
                            type="email" required value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="ivan@mail.com" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Роль</label>
                        <select
                            value={role} onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        >
                            <option value="User">Пацієнт (User)</option>
                            <option value="Admin">Лікар (Admin)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Пароль</label>
                        <input
                            type="password" required
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Мінімум 4 символи"/>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 mt-4 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                    >
                        Створити
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserCreate;