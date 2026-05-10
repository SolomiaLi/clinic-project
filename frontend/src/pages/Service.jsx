import { useState, useEffect } from 'react';
import api from '../api/axios';

const Services = () => {
    const [servicesData, setServicesData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await api.get('/services');
                setServicesData(response.data);
            } catch {
                setError('Не вдалося завантажити прайс-лист');
            }
        };

        fetchServices();
    }, []);

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            <div className="bg-indigo-900 text-white py-16 px-6 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                    Прайс-лист послуг
                </h1>
                <p className="text-blue-200 max-w-2xl mx-auto">
                    Прозоре ціноутворення та жодних прихованих платежів. Ми пропонуємо 
                    широкий спектр медичних послуг найвищої якості.
                </p>
            </div>

            <div className="max-w-4xl mx-auto px-4 mt-8">
                {error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center mb-6">
                        {error}
                    </div>
                )}

                {servicesData.length === 0 && !error ? (
                    <div className="text-center text-xl text-gray-500 py-10">
                        Завантаження послуг...
                    </div>
                ) : (
                    <div className="space-y-8">
                        {servicesData.map((categoryBlock) => (
                            <div key={categoryBlock.id} className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
                                {/* Заголовок категорії */}
                                <h2 className="text-2xl font-bold text-indigo-900 mb-6 border-b border-gray-100 pb-4">
                                    {categoryBlock.category}
                                </h2>

                                {/* Список послуг */}
                                <div className="space-y-4">
                                    {categoryBlock.items.map((item, index) => (
                                        <div 
                                            key={index} 
                                            className="flex justify-between items-center py-2"
                                        >
                                            <span className="text-gray-700 font-medium">
                                                {item.name}
                                            </span>
                                            <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide">
                                                {item.price}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Services;