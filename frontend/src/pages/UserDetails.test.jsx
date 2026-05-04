import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import UserDetails from './UserDetails';

describe('UserDetails Component', () => {
    it('успішно рендерить сторінку без помилок', () => {
        const { container } = render(
            <BrowserRouter>
                <UserDetails />
            </BrowserRouter>
        );
        expect(container).toBeInTheDocument();
    });
});