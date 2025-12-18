import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../../context/ThemeContext';
import Navbar from '../Navbar';

// Mock useLocation
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({ pathname: '/' }),
  };
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        {ui}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Navbar', () => {
  it('renders the ClinicHub logo', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText(/ClinicHub/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Doctors/i)).toBeInTheDocument();
  });

  it('renders login button', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });
});




