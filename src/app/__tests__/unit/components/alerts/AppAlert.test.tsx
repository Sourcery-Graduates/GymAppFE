import AppAlert from '@/app/components/alerts/AppAlert.tsx';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

describe('AppAlert', () => {
  const mockOnClose = vi.fn();

  it('should render the alert with correct text', () => {
    render(<AppAlert open={true} onClose={mockOnClose} text='Test alert' severity='error' />);

    const alert = screen.getByRole('alert');

    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('Test alert');
  });

  it('should not render the alert when open is false', () => {
    render(<AppAlert open={false} onClose={mockOnClose} text='Hidden alert' severity='info' />);

    const alert = screen.queryByRole('alert');

    expect(alert).not.toBeInTheDocument();
  });

  it('should call onClose when dismissed', async () => {
  render(<AppAlert open={true} onClose={mockOnClose} text='Dismissable alert' severity='warning' />);
  
  const closeButton = screen.getByRole('button'); // get alert close button

  await userEvent.click(closeButton);

  expect(mockOnClose).toHaveBeenCalledTimes(1);
});

});
