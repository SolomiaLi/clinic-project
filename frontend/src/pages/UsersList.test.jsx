import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import UsersList from './UsersList';

// Фейковий сервер, який віддає одного користувача і "успішно" його видаляє
vi.mock('../api/axios', () => ({
    default: {
        get: vi.fn(() => Promise.resolve({ data: [{ _id: '1', name: 'Олеся Тест', email: 'test@mail.com', role: 'admin' }] })),
        delete: vi.fn(() => Promise.resolve({ data: 'deleted' }))
    }
}));

describe('UsersList Component', () => {
    it('завантажує список та імітує видалення', async () => {
        const { container } = render(
            <BrowserRouter>
                <UsersList />
            </BrowserRouter>
        );

        // Чекаємо, поки користувач з'явиться на екрані (покриває рядки завантаження)
        await waitFor(() => {
            expect(screen.getByText('Олеся Тест')).toBeInTheDocument();
        });

        // Шукаємо кнопку видалення і клікаємо її
        const buttons = container.querySelectorAll('button');
        if (buttons.length > 0) {
            // Глушимо confirm і alert, щоб тест не падав
            window.confirm = vi.fn(() => true); 
            window.alert = vi.fn();
            
            // Клікаємо на останню кнопку (зазвичай це видалення)
            fireEvent.click(buttons[buttons.length - 1]);
        }
    });
});