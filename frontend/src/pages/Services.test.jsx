import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Services from './Service';

describe('Services Component', () => {
    it('рендерить сторінку прайс-листа', () => {
        render(<Services />);
        
        expect(screen.getByText(/Прайс-лист послуг/i)).toBeInTheDocument();
        
        expect(screen.getByText(/Завантаження послуг.../i)).toBeInTheDocument();
    });
});