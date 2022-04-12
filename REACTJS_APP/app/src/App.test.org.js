import { render, screen } from '@testing-library/react';
import App from './App';

test('check hello surya text is present', () => {
  render(<App />);
  const linkElement = screen.getByText(/hello SURYA/i);
  expect(linkElement).toBeInTheDocument();
});


test('check india text is present', () => {
  render(<App />);
  const linkElement = screen.getByText(/my name is surya /i);
  expect(linkElement).toBeInTheDocument();
});