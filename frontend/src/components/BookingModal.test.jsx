import { render, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import BookingModal from './BookingModal';
import axios from '../api/axios';

vi.mock('../api/axios');

describe('BookingModal Component', () => {
    const mockDoctor = { _id: '1', name: 'Олександр Петренко', specialty: 'Кардіолог' };

    it('заповнює всі поля коректними даними і успішно відправляє форму', async () => {
        axios.post.mockResolvedValueOnce({ data: 'success' });
        const handleClose = vi.fn();
        
        const { container } = render(<BookingModal doctor={mockDoctor} onClose={handleClose} />);
        const inputs = container.querySelectorAll('input');
    
        if (inputs[0]) fireEvent.change(inputs[0], { target: { value: 'Іван Петров' } }); 
        if (inputs[1]) fireEvent.change(inputs[1], { target: { value: '2026-10-10' } });  
        if (inputs[2]) fireEvent.change(inputs[2], { target: { value: '14:30' } });       

        const form = container.querySelector('form');
        window.alert = vi.fn(); 
        
        fireEvent.submit(form);

        await waitFor(() => {
            expect(handleClose).toHaveBeenCalled();
        });
    });

    it('обробляє помилку сервера при відправці (покриває catch)', async () => {
        axios.post.mockRejectedValueOnce(new Error('Server Error'));
        const { container } = render(<BookingModal doctor={mockDoctor} onClose={vi.fn()} />);
        
        const form = container.querySelector('form');
        window.alert = vi.fn();
        
        fireEvent.submit(form);

        await waitFor(() => {
            expect(window.alert).toHaveBeenCalled();
        });
    });

    it('закривається при кліку на кнопку скасування', () => {
        const handleClose = vi.fn();
        const { container } = render(<BookingModal doctor={mockDoctor} onClose={handleClose} />);
        const buttons = container.querySelectorAll('button');
        const closeBtn = Array.from(buttons).find(btn => btn.type === 'button');
        
        if (closeBtn) {
            fireEvent.click(closeBtn);
            expect(handleClose).toHaveBeenCalled();
        }
    });
});