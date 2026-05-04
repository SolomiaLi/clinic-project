import { useState } from 'react';
import api from '../api/axios';

const CallbackModal = ({ onClose }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/callbacks', { name, phone });
            alert('Дякуємо! Наш адміністратор зателефонує вам найближчим часом.');
            onClose();
        } catch {
            alert('Сталася помилка. Будь ласка, спробуйте пізніше.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative animate-fade-in-up">
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors"
                >
                    ✕
                </button>
                
                <div className="text-center mb-6">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                        📞
                    </div>
                    <h2 className="text-2xl font-bold text-indigo-900">Зворотний зв'язок</h2>
                    <p className="text-gray-500 text-sm mt-2">
                        Залиште свої контакти, і ми підберемо для вас найкращого спеціаліста та зручний час.
                    </p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input 
                            required
                            type="text" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="Ваше ім'я"
                        />
                    </div>
                    <div>
                        <input 
                            required
                            type="tel" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="+38 (000) 000-00-00"
                        />
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 mt-2 bg-indigo-900 text-white font-bold rounded-xl hover:bg-indigo-800 disabled:bg-indigo-400 shadow-lg transition-colors"
                    >
                        {loading ? 'Надсилаю...' : 'Замовити дзвінок'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CallbackModal;