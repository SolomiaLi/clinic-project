import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AdminRequests from './AdminRequests';

describe('AdminRequests Component', () => {
    it('рендерить сторінку з таблицями заявок', () => {
        render(<AdminRequests />);
        
        expect(screen.getByText(/Заявки від пацієнтів/i)).toBeInTheDocument();
        expect(screen.getByText(/Записи на прийом/i)).toBeInTheDocument();
        expect(screen.getByText(/Замовлення дзвінків/i)).toBeInTheDocument();
    });
});