const API_BASE = 'http://127.0.0.1:8000/api';

const navigateTo = (viewId) => {
    const views = document.querySelectorAll('.spa-view');
    views.forEach((view) => {
        view.classList.remove('active-view');
    });

    const activeView = document.getElementById(`view-${viewId}`);
    if (activeView) {
        activeView.classList.add('active-view');
    }
};

const handleNavigation = () => {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            navigateTo(targetId);
            window.location.hash = targetId;
        });
    });
};

const renderDoctors = (doctors) => {
    const container = document.getElementById('dynamic-doctors-list');
    if (!container) return;
    container.innerHTML = '';

    doctors.forEach((doctor) => {
        const card = document.createElement('div');
        card.className = 'info-card';
        card.innerHTML = `
            <i class="fa-solid fa-user-doctor card-icon"></i>
            <h3>${doctor.name}</h3>
            <p style="color: #4f46e5; font-weight: bold; margin-bottom: 10px;">${doctor.specialty}</p>
            <p>${doctor.experience} years of experience.</p>
        `;
        container.appendChild(card);
    });
};

const renderServices = (services) => {
    const container = document.getElementById('dynamic-services-list');
    if (!container) return;
    container.innerHTML = '';

    services.forEach((service) => {
        const card = document.createElement('div');
        card.className = 'info-card';
        card.innerHTML = `
            <i class="${service.icon} card-icon"></i>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        `;
        container.appendChild(card);
    });
};

const fetchDoctors = () => {
    window.fetch(`${API_BASE}/doctors`)
        .then((response) => response.json())
        .then((data) => renderDoctors(data))
        .catch(() => {});
};

const fetchServices = () => {
    window.fetch(`${API_BASE}/services`)
        .then((response) => response.json())
        .then((data) => renderServices(data))
        .catch(() => {});
};

const handleLogin = (event) => {
    event.preventDefault();
    const email = document.getElementById('user-email').value;
    const password = document.getElementById('user-password').value;
    const errorMsg = document.getElementById('login-error');

    window.fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })
        .then((response) => {
            if (!response.ok) throw new Error();
            return response.json();
        })
        .then(() => {
            errorMsg.style.display = 'none';
            navigateTo('home');
            window.location.hash = 'home';
        })
        .catch(() => {
            errorMsg.style.display = 'block';
        });
};

const initApp = () => {
    handleNavigation();
    fetchDoctors();
    fetchServices();

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const initialHash = window.location.hash.substring(1) || 'home';
    navigateTo(initialHash);
};

window.addEventListener('DOMContentLoaded', initApp);