import { useState, useEffect } from 'react';
import api from '../api/axios';
import BookingModal from '../components/BookingModal';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await api.get('/doctors');
                setDoctors(response.data);
            } catch {
                setError('Не вдалося завантажити список лікарів');
            }
        };

        fetchDoctors();
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen pb-24">
            {/* Синій хедер сторінки */}
            <div className="bg-indigo-900 text-white py-20 px-12 text-center relative">
                <h1 className="text-4xl font-extrabold mb-4 tracking-wide">
                    НАША КОМАНДА
                </h1>
                <p className="text-blue-200 max-w-2xl mx-auto text-lg">
                    Довірте своє здоров'я найкращим фахівцям. Наші лікарі постійно 
                    підвищують свою кваліфікацію та використовують сучасні методи лікування.
                </p>
            </div>

            {/* Сітка з картками лікарів */}
            <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-10">
                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center mb-6">
                        {error}
                    </div>
                )}
                
                {doctors.length === 0 && !error ? (
                    <div className="text-center text-xl text-gray-500 py-10">
                        Завантаження лікарів...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {doctors.map((doctor) => (
                            <div key={doctor.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all hover:-translate-y-1">
                                <div className="h-56 bg-blue-50 flex items-center justify-center text-8xl shadow-inner border-b border-gray-100">
                                    {doctor.icon}
                                </div>
                                
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-indigo-900 mb-1">
                                        {doctor.name}
                                    </h3>
                                    <p className="text-blue-600 font-medium mb-3">
                                        {doctor.specialty}
                                    </p>
                                    <p className="text-gray-500 text-sm mb-6">
                                        Досвід роботи: {doctor.experience}
                                    </p>
                                    
                                    <button 
                                        onClick={() => setSelectedDoctor(doctor)}
                                        className="w-full py-3 border-2 border-blue-500 text-blue-600 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
                                    >
                                    Записатися на прийом
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {selectedDoctor && (
                <BookingModal  doctor={selectedDoctor}  onClose={() => setSelectedDoctor(null)} 
                />
            )}
        </div>
    );
};

export default Doctors;