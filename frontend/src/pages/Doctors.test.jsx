import { render, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Doctors from './Doctors';

// Мокаємо бекенд: віддаємо фейкового лікаря
vi.mock('../api/axios', () => ({
    default: {
        get: vi.fn(() => Promise.resolve({ 
            data: [{ _id: '1', name: 'Олександр Петренко', specialty: 'Кардіолог', experience: '10 років' }] 
        }))
    }
}));

describe('Doctors Component', () => {
    it('успішно завантажує і відображає список лікарів', async () => {
        const { container } = render(
            <BrowserRouter>
                <Doctors />
            </BrowserRouter>
        );

        // Чекаємо, поки лікар з'явиться на екрані (це відкриє рядки 51-80!)
        await waitFor(() => {
            expect(container.textContent).toMatch(/Олександр Петренко/i);
        });
        
        // Якщо є кнопка "Записатися" - клікаємо на неї
        const buttons = container.querySelectorAll('button');
        if (buttons.length > 0) {
            fireEvent.click(buttons[0]);
        }
    });
});