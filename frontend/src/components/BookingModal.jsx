import { useState } from 'react';
import api from '../api/axios';

// eslint-disable-next-line max-lines-per-function
const BookingModal = ({ doctor, onClose }) => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        patientName: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/appointments', {
                doctor_id: doctor.id,
                doctor_name: doctor.name,
                patient_name: formData.patientName,
                date: formData.date,
                time: formData.time
            });
            alert('Ви успішно записані!');
            onClose();
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
            alert('Помилка при записі');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                <h2 className="text-2xl font-bold text-indigo-900 mb-4">Запис до лікаря</h2>
                <p className="text-gray-600 mb-6 font-medium">Лікар: <span className="text-blue-600">{doctor.name}</span></p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Ваше ім'я</label>
                        <input 
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            type="text" 
                            value={formData.patientName}
                            onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Дата</label>
                            <input 
                                required
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                type="date" 
                                value={formData.date}
                                onChange={(e) => setFormData({...formData, date: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Час</label>
                            <input 
                                required
                                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                type="time" 
                                value={formData.time}
                                onChange={(e) => setFormData({...formData, time: e.target.value})}
                            />
                        </div>
                    </div>
                    
                    <div className="flex gap-3 mt-6">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200"
                        >
                            Скасувати
                        </button>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
                        >
                            {loading ? 'Надсилаю...' : 'Підтвердити'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;