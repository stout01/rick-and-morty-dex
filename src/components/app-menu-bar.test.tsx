import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppMenuBar from './app-menu-bar';

describe('AppMenuBar', () => {
  it('should contain link to characters', () => {
    render(
      <BrowserRouter>
        <AppMenuBar></AppMenuBar>
      </BrowserRouter>
    );

    expect(screen.getByText('Characters').closest('a')).toHaveAttribute(
      'href',
      '/characters'
    );
  });

  it('should contain link to recommended episodes', () => {
    render(
      <BrowserRouter>
        <AppMenuBar></AppMenuBar>
      </BrowserRouter>
    );

    expect(
      screen.getByText('Recommended Episodes').closest('a')
    ).toHaveAttribute('href', '/recommended-episodes');
  });
});
