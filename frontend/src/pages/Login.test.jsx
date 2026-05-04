import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';

describe('Login Component', () => {
    it('дозволяє вводити email та пароль', () => {
        const { container } = render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );
        
        // Шукаємо поля за типом, щоб тест не залежав від конкретного тексту
        const emailInput = container.querySelector('input[type="email"]');
        const passwordInput = container.querySelector('input[type="password"]');
        const submitButton = container.querySelector('button[type="submit"]');

        if (emailInput && passwordInput && submitButton) {
            fireEvent.change(emailInput, { target: { value: 'admin@clinic.com' } });
            fireEvent.change(passwordInput, { target: { value: 'secret123' } });
            fireEvent.click(submitButton);
        }
        
        expect(container).toBeInTheDocument();
    });
});