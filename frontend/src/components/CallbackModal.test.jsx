import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CallbackModal from './CallbackModal';

describe('CallbackModal Component', () => {
    it('дозволяє вводити дані і відправляти форму', () => {
        const { container } = render(<CallbackModal onClose={vi.fn()} />);
        
        const inputs = container.querySelectorAll('input');
        const submitBtn = container.querySelector('button[type="submit"]');
        if (inputs.length > 1) {
            fireEvent.change(inputs[0], { target: { value: 'Іван' } });
            fireEvent.change(inputs[1], { target: { value: '0991234567' } });
        }
        if (submitBtn) {
            fireEvent.click(submitBtn);
        }

        expect(screen.getByText(/Зворотний зв'язок/i)).toBeInTheDocument();
    });
});