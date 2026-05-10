import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8080');

const AdminChat = () => {
    const [messages, setMessages] = useState([]);
    const [replyText, setReplyText] = useState('');

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessages((prev) => [...prev, data]);
        });
        return () => socket.off('receive_message');
    }, []);

    // Функція відправки повідомлення від Адміна
    const handleSendReply = (e) => {
        e.preventDefault();
        if (replyText.trim()) {
            const msgData = {
                user: 'Клініка (Адмін)', // Ім'я, яке побачить пацієнт
                text: replyText,
                role: 'Admin', // Роль для правильного відображення
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            socket.emit('send_message', msgData);
            setReplyText(''); // Очищаємо поле
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col h-[500px]">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">💬</span> Живий чат з пацієнтами
            </h2>
            
            {/* Вікно з повідомленнями */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 rounded-lg mb-4 border space-y-3">
                {messages.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-gray-400">
                        Повідомлень поки немає...
                    </div>
                ) : (
                    messages.map((msg, idx) => (
                        <div key={idx} className={`flex flex-col ${msg.role === 'Admin' ? 'items-end' : 'items-start'}`}>
                            <span className="text-xs text-gray-500 mb-1">{msg.user} • {msg.time}</span>
                            <div className={`p-3 rounded-lg max-w-[80%] shadow-sm ${msg.role === 'Admin' ? 'bg-indigo-600 text-white' : 'bg-white border text-gray-800'}`}>
                                {msg.text}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Поле вводу для адміна */}
            <form onSubmit={handleSendReply} className="flex gap-2 mt-auto">
                <input 
                    type="text" 
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Написати відповідь пацієнту..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button 
                    type="submit" 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                    Відправити
                </button>
            </form>
        </div>
    );
};

export default AdminChat;