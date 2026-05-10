import { useState } from 'react';
import CallbackModal from '../components/CallbackModal';

// eslint-disable-next-line max-lines-per-function
const Home = () => {
    const [isCallbackOpen, setIsCallbackOpen] = useState(false);
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="bg-indigo-900 text-white pt-20 pb-32 px-12 relative">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <div className="max-w-xl">
                        <p className="text-blue-400 font-bold tracking-widest mb-2 uppercase text-sm">
                            Твоє здоров'я — наш пріоритет
                        </p>
                        <h1 className="text-6xl font-extrabold mb-6 leading-tight">
                            СУЧАСНА <br /> МЕДИЦИНА
                        </h1>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">Провідна клініка з інноваційними методами лікування та діагностики. Ми дбаємо про вас 24/7, надаючи найкращий сервіс та професійний підхід.
                        </p>
                        <button 
                            onClick={() => setIsCallbackOpen(true)}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-lg transition-transform hover:-translate-y-1">
                            Записатися на прийом
                        </button>
                    </div>
                    <div className="hidden lg:block w-96 h-96 bg-blue-800 rounded-full opacity-50 blur-3xl absolute right-20"></div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-12 -mt-16 relative z-10">
                <div className="bg-white rounded-xl shadow-xl p-8 flex justify-between items-center border border-gray-100">
                    <div className="text-center px-6 border-r border-gray-200 w-full">
                        <p className="text-gray-500 font-semibold mb-1 text-sm">Пацієнтів</p>
                        <p className="text-4xl font-bold text-indigo-900">15,720+</p>
                    </div>
                    <div className="text-center px-6 border-r border-gray-200 w-full">
                        <p className="text-gray-500 font-semibold mb-1 text-sm">Лікарів</p>
                        <p className="text-4xl font-bold text-indigo-900">120+</p>
                    </div>
                    <div className="text-center px-6 w-full">
                        <p className="text-gray-500 font-semibold mb-1 text-sm">Успішних операцій</p>
                        <p className="text-4xl font-bold text-indigo-900">9,387</p>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-12 py-24 text-center">
                <p className="text-blue-500 font-bold tracking-widest text-sm uppercase mb-2">Наші переваги</p>
                <h2 className="text-4xl font-extrabold text-indigo-900 mb-12">ЧОМУ ОБИРАЮТЬ НАС</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Картка 1: Обладнання */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow">
                        <div className="h-48 bg-blue-50 flex items-center justify-center text-7xl shadow-inner border-b border-gray-100"> 🏥
                        </div>
                        <div className="p-6 text-left">
                            <h3 className="text-xl font-bold text-indigo-900 mb-3">Сучасне обладнання</h3>
                            <p className="text-gray-600 text-sm">Використовуємо найновіші технології для точної діагностики та швидкого лікування.</p>
                        </div>
                    </div>
                    
                    {/* Картка 2: Фахівці */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow">
                        <div className="h-48 bg-blue-50 flex items-center justify-center text-7xl shadow-inner border-b border-gray-100">
                            👨‍⚕️
                        </div>
                        <div className="p-6 text-left">
                            <h3 className="text-xl font-bold text-indigo-900 mb-3">Досвідчені фахівці</h3>
                            <p className="text-gray-600 text-sm">Наша команда складається з лікарів вищої категорії з багаторічним досвідом.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow">
                        <div className="h-48 bg-blue-50 flex items-center justify-center text-7xl shadow-inner border-b border-gray-100">
                            📞
                        </div>
                        <div className="p-6 text-left">
                            <h3 className="text-xl font-bold text-indigo-900 mb-3">Підтримка 24/7</h3>
                            <p className="text-gray-600 text-sm">Ми завжди на зв'язку, щоб надати екстрену допомогу або консультацію онлайн.</p>
                        </div>
                    </div>
                </div>
            </div>
            {isCallbackOpen && (
                <CallbackModal onClose={() => setIsCallbackOpen(false)} />
            )}
        </div>
    );
};

export default Home;