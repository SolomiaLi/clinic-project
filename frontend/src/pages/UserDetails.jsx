import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';

const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get(`/users/${id}`);
                setUser(response.data);
            } catch {
                setError('Не вдалося завантажити дані користувача');
            }
        };

        fetchUser();
    }, [id]);

    if (error) return <div className="p-8 text-red-500 text-center font-bold">{error}</div>;
    if (!user) return <div className="p-8 text-center text-gray-500">Завантаження...</div>;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                    <h1 className="text-2xl font-bold text-indigo-900">Профіль</h1>
                </div>

                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500 font-medium">ID користувача</p>
                        <p className="text-lg font-semibold text-gray-800">{user.id}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Ім'я</p>
                        <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Email</p>
                        <p className="text-lg font-semibold text-gray-800">{user.email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium">Роль</p>
                        <span className="inline-block mt-1 px-3 py-1 bg-green-100 text-green-700 rounded-md font-medium text-sm">
                            {user.role}
                        </span>
                    </div>
                </div>

                <div className="mt-8 pt-4 border-t border-gray-100 flex justify-end">
                    <Link 
                        to={`/users/edit/${user.id}`}
                        className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
                    >
                        Редагувати
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;