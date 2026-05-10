import { useState, useEffect } from 'react';
import api from '../api/axios';
import AdminChat from './AdminChat'; 
import { useNavigate } from 'react-router-dom';

const AdminRequests = () => {
    const [appointments, setAppointments] = useState([]);
    const [callbacks, setCallbacks] = useState([]);
    const [error, setError] = useState(''); const navigate = useNavigate();

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const appRes = await api.get('/appointments');
                const callRes = await api.get('/callbacks'); 
                setAppointments(appRes.data);
                setCallbacks(callRes.data);
            } catch {
                setError('Не вдалося завантажити дані з сервера');
            }
        };
        fetchRequests();
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen p-8">
            <h1 className="text-3xl font-bold text-indigo-900 mb-8">Панель адміністратора</h1>
            
            {error && <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

            <button 
                onClick={() => navigate(-1)} 
                className="mb-6 flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
                <span className="mr-2">⬅</span> Повернутися назад
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <span className="text-2xl mr-2">📅</span> Записи на прийом
                    </h2>
                    {appointments.length === 0 ? (
                        <p className="text-gray-500">Немає нових записів.</p>
                    ) : (
                        <div className="space-y-4">
                            {appointments.map((app, index) => (
                                <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                    <p className="font-bold text-indigo-900">{app.patient_name}</p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        До лікаря: <span className="font-semibold">{app.doctor_name}</span>
                                    </p>
                                    <p className="text-sm text-blue-600 mt-1 font-semibold">
                                        {app.date} о {app.time}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <span className="text-2xl mr-2">📞</span> Замовлення дзвінків
                    </h2>
                    {callbacks.length === 0 ? (
                        <p className="text-gray-500">Немає запитів на дзвінок.</p>
                    ) : (
                        <div className="space-y-4">
                            {callbacks.map((call, index) => (
                                <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-100 flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-indigo-900">{call.name}</p>
                                        <p className="text-gray-600">{call.phone}</p>
                                    </div>
                                    <button className="px-4 py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700"> Оброблено </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full"> <AdminChat /> </div>
        </div>
    );
};

export default AdminRequests;