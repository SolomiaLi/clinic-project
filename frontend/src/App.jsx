import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import UsersList from './pages/UsersList';
import UserCreate from './pages/UserCreate';
import UserDetails from './pages/UserDetails';
import UserEdit from './pages/UserEdit';
import Services from './pages/Service';
import Doctors from './pages/Doctors';
import AdminRequests from './pages/AdminRequests';
import ChatWidget from './components/ChatWidget';
import AdminChat from './pages/AdminChat';
import Register from './pages/Register';


function App() {
    const role = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName') || "Користувач";
    const userId = localStorage.getItem('userId');

    return (
        <Router>
            <nav className="p-5 bg-indigo-900 text-white flex justify-between items-center px-12">
                <Link to="/" className="text-2xl font-bold tracking-wider">
                    CLINIC<span className="text-blue-400">SYSTEM</span>
                </Link>
                
                <div className="flex gap-8 text-sm font-semibold uppercase tracking-wide items-center">
                    <Link to="/" className="hover:text-blue-300 transition-colors">Головна</Link>
                    <Link to="/doctors" className="hover:text-blue-300 transition-colors">Лікарі</Link>
                    <Link to="/services" className="hover:text-blue-300 transition-colors">Послуги</Link>
                    
                    {!role ? (
                        <Link to="/login" className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-full transition-colors">
                            Вхід
                        </Link>
                    ) : (
                        <>
                            {role === 'Admin' || role === 'admin' ? (
                                <Link to="/users" className="text-blue-300 hover:text-white">Адмін-панель</Link>
                            ) : (
                                <Link to={`/users/${userId}`} className="text-blue-300 hover:text-white">Мій профіль</Link>
                            )}
                            <button 
                                onClick={() => { localStorage.clear(); window.location.href='/'; }}
                                className="text-red-400 hover:text-red-300"
                            >
                                Вихід
                            </button>
                        </>
                    )}
                </div>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<UsersList />} />
                <Route path="/users/create" element={<UserCreate />} />
                <Route path="/users/:id" element={<UserDetails />} />
                <Route path="/users/edit/:id" element={<UserEdit />} />
                <Route path="/admin/requests" element={<AdminRequests />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/services" element={<Services />} />
                <Route path="/admin/chat" element={<AdminChat />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            <ChatWidget userName={userName} userRole={role} />
        </Router>
    );
}

export default App;