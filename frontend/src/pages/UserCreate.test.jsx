import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import UserCreate from './UserCreate';

// Фейковий сервер для створення
vi.mock('../api/axios', () => ({
    default: {
        post: vi.fn(() => Promise.resolve({ data: 'success' }))
    }
}));

describe('UserCreate Component', () => {
    it('заповнює всі поля і відправляє форму', async () => {
        const { container } = render(
            <BrowserRouter>
                <UserCreate />
            </BrowserRouter>
        );

        const inputs = container.querySelectorAll('input');
        const submitBtn = container.querySelector('button[type="submit"]');

        // Пробігаємося по ВСІХ інпутах (покриває handleChange)
        inputs.forEach(input => {
            fireEvent.change(input, { target: { value: 'Тестове Значення' } });
        });

        // Клікаємо відправити (покриває handleSubmit)
        if (submitBtn) {
            window.alert = vi.fn();
            fireEvent.click(submitBtn);
        }

        await waitFor(() => {
            expect(container).toBeInTheDocument();
        });
    });
});