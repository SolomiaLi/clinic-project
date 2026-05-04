import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users');
                setUsers(response.data);
            } catch { setError('Не вдалося завантажити список користувачів');
            }
        };
        fetchUsers();
    }, []);
    const handleDelete = async (id) => {
        try {
            await api.delete(`/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
        } catch { setError('Не вдалося видалити користувача');
        }
    };
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Кабінет Адміна: Користувачі</h1>
                {/* НОВА КНОПКА ДЛЯ ЗАЯВОК */}
                <Link to="/admin/requests" className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-semibold shadow-md">
                        Переглянути заявки пацієнтів
                </Link>
                <Link to="/users/create" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    + Додати лікаря/пацієнта
                </Link>
            </div>
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}
                </div>
            )}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="p-4 border-b">ID</th>
                            <th className="p-4 border-b">Ім'я</th>
                            <th className="p-4 border-b">Email</th>
                            <th className="p-4 border-b">Роль</th>
                            <th className="p-4 border-b text-center">Дії</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="p-4 border-b">{user.id}</td>
                                <td className="p-4 border-b font-medium">{user.name}</td>
                                <td className="p-4 border-b">{user.email}</td>
                                <td className="p-4 border-b">
                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-sm">
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 border-b text-center space-x-3">
                                    <Link to={`/users/${user.id}`} className="text-blue-500 hover:underline">Перегляд</Link>
                                    <Link to={`/users/edit/${user.id}`} className="text-yellow-600 hover:underline">Редагувати</Link>
                                    <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:underline">Видалити</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UsersList;