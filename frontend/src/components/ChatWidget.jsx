import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// Підключаємося до нашого Python сервера
const socket = io('http://localhost:8080');

const ChatWidget = ({ userRole, userName }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        // Слухаємо нові повідомлення від сервера
        socket.on('receive_message', (data) => {
            setChat((prev) => [...prev, data]);
        });

        return () => socket.off('receive_message');
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            const msgData = {
                user: userName || 'Гість',
                text: message,
                role: userRole || 'User',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            // Відправляємо на бекенд
            socket.emit('send_message', msgData);
            setMessage('');
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Кнопка чату */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all"
            >
                {isOpen ? '❌' : '💬 Чат з клінікою'}
            </button>

            {/* Вікно чату */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                    <div className="bg-blue-600 p-4 text-white font-bold">
                        Підтримка клініки 🏥
                    </div>
                    
                    <div className="h-64 overflow-y-auto p-4 space-y-3 bg-gray-50">
                        {chat.map((msg, index) => (
                            <div key={index} className={`flex flex-col ${msg.user === userName ? 'items-end' : 'items-start'}`}>
                                <span className="text-xs text-gray-500 mb-1">{msg.user} • {msg.time}</span>
                                <div className={`p-2 rounded-lg max-w-[80%] ${msg.user === userName ? 'bg-blue-500 text-white' : 'bg-white border text-gray-800'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={sendMessage} className="p-3 border-t flex gap-2">
                        <input 
                            type="text" 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Напишіть нам..."
                            className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="submit" className="bg-blue-600 text-white px-3 py-2 rounded-lg">➜</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;