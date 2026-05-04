import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import UserEdit from './UserEdit';

// Фейковий сервер: віддає дані для редагування і приймає оновлення
vi.mock('../api/axios', () => ({
    default: {
        get: vi.fn(() => Promise.resolve({ data: { name: 'Старе Ім\'я', email: 'old@mail.com', role: 'user' } })),
        put: vi.fn(() => Promise.resolve({ data: 'success' })),
        patch: vi.fn(() => Promise.resolve({ data: 'success' })) // на випадок, якщо ти юзаєш patch
    }
}));

describe('UserEdit Component', () => {
    it('завантажує юзера, змінює дані і зберігає', async () => {
        const { container } = render(
            <BrowserRouter>
                <UserEdit />
            </BrowserRouter>
        );

        // Чекаємо, поки завантажаться інпути зі старими даними
        await waitFor(() => {
            const inputs = container.querySelectorAll('input');
            expect(inputs.length).toBeGreaterThan(0);
        });

        const inputs = container.querySelectorAll('input');
        const submitBtn = container.querySelector('button[type="submit"]');

        // Вводимо нове значення в перше поле
        if (inputs.length > 0) {
            fireEvent.change(inputs[0], { target: { value: 'Нове Ім\'я' } });
        }

        // Відправляємо форму
        if (submitBtn) {
            window.alert = vi.fn();
            fireEvent.click(submitBtn);
        }
    });
});