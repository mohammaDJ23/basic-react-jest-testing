import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScoopOption from '../ScoopOption';

test('indicate if scoop count isn non-int or out of range', async function () {
  render(<ScoopOption name={''} imagePath={''} updateItemCount={jest.fn()} />);

  const vanillaInput = screen.getByRole('spinbutton');

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1.5');

  expect(vanillaInput).toHaveClass('is-invalid');

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '-1');

  expect(vanillaInput).toHaveClass('is-invalid');

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '21');

  expect(vanillaInput).toHaveClass('is-invalid');

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  expect(vanillaInput).not.toHaveClass('is-invalid');
});
