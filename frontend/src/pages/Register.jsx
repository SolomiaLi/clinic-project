import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/register', { 
                name, email, password 
            });

            localStorage.setItem('userRole', response.data.user.role);
            localStorage.setItem('userName', response.data.user.name);
            localStorage.setItem('userId', response.data.user.id); 
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            window.location.href = `/users/${response.data.user.id}`; 

        } catch (err) {
            setError(err.response?.data?.detail || "Помилка реєстрації. Спробуйте ще раз.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-indigo-900 mb-6">Реєстрація</h2>
                
                {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}
                
                <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Ім'я</label>
                        <input 
                            type="text" 
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input 
                            type="email" 
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Пароль</label>
                        <input 
                            type="password" 
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Зареєструватися
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Вже маєте акаунт? <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">Увійти</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;