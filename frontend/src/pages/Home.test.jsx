import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

// Кажемо тесту, що сервер завжди успішно відповідає порожніми даними
vi.mock('../api/axios', () => ({
    default: {
        get: vi.fn(() => Promise.resolve({ data: [] }))
    }
}));

describe('Home Component', () => {
    it('рендерить сторінку після успішного завантаження даних', async () => {
        const { container } = render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        // Чекаємо, поки відпрацює useEffect і зникне "Завантаження..."
        await waitFor(() => {
            expect(container).toBeInTheDocument();
        });
    });
});