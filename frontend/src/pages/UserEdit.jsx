import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const UserEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('User');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`/users/${id}`);
                const user = response.data; setName(user.name); setEmail(user.email); setRole(user.role);
            } catch { setError('Не вдалося завантажити дані для редагування');
            }
        };
        fetchUser();
    }, [id]);

    const handleUpdate = async (e) => { e.preventDefault(); setError('');
        const updatedUser = { name, email, role, password };

        try {
            await api.put(`/users/${id}`, updatedUser); navigate(-1);
        } catch {
            setError('Помилка при оновленні користувача');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-indigo-900">Редагування</h1>
                    <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-indigo-900 transition-colors cursor-pointer">✕ Скасувати</button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>
                )}

                <form onSubmit={handleUpdate} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Ім'я</label>
                        <input 
                            type="text" required value={name} onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                        <input 
                            type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Роль</label>
                        <select 
                            value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                        >
                            <option value="User">Пацієнт (User)</option> <option value="Admin">Лікар (Admin)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Новий пароль</label>
                        <input 
                            type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="Введіть пароль для підтвердження" />
                    </div>
                    <button 
                        type="submit" className="w-full py-3 mt-4 font-bold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition-colors shadow-md"
                    >
                        Зберегти зміни
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserEdit;