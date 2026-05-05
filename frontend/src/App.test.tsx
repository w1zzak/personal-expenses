import { render, screen, act } from '@testing-library/react';
import App from './App';

// Mock de los servicios de API
jest.mock('./services/api', () => ({
  loginUser: jest.fn(),
  registerUser: jest.fn(),
  getExpenses: jest.fn(() => Promise.resolve([])),
  deleteExpense: jest.fn(),
  createExpense: jest.fn(),
  updateExpense: jest.fn(),
  interceptors: {
    request: { use: jest.fn() }
  },
  defaults: { headers: { common: {} } }
}));

describe('Frontend Auth Flow Check', () => {
  it('should render the login portal by default', async () => {
    await act(async () => {
      render(<App />);
    });
    const welcomeElement = screen.getByText(/Bienvenido/i);
    expect(welcomeElement).toBeInTheDocument();
  });
});
