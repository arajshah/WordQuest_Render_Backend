import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Navbar and Modes selection', () => {
  render(<App />);
  
  // Check for Navbar content
  expect(screen.getByText(/WordQuest/i)).toBeInTheDocument();

  // Check for Modes selection content
  const modeHeaders = screen.getAllByText(/Select a Mode/i);
  expect(modeHeaders.length).toBe(2); // Adjust this based on the expected number

  // Check for mode buttons
  const classicButtons = screen.getAllByText(/Classic/i);
  classicButtons.forEach((button) => {
    expect(button).toBeInTheDocument();
  });

  const storyButtons = screen.getAllByText(/Story/i);
  storyButtons.forEach((button) => {
    expect(button).toBeInTheDocument();
  });

  const customButtons = screen.getAllByText(/Custom/i);
  customButtons.forEach((button) => {
    expect(button).toBeInTheDocument();
  });
});
