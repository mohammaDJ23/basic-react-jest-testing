import { fireEvent, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event';

test('Checkbox is unchecked by default and click on it to see if button could be disable', function () {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
  const button = screen.getByRole('button', { name: /confirm order/i });

  expect(checkbox).not.toBeChecked();

  fireEvent.click(checkbox);

  expect(button).toBeEnabled();
});

test('Ceckbox enables button on first click and disables on second click', function () {
  render(<SummaryForm />);

  const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i });
  const button = screen.getByRole('button', { name: /confirm order/i });

  fireEvent.click(checkbox);

  expect(button).toBeEnabled();

  fireEvent.click(checkbox);

  expect(button).toBeDisabled();
});

test('popover responds to hover', async function () {
  render(<SummaryForm />);

  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);

  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);

  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);

  expect(popover).toBeInTheDocument();

  userEvent.unhover(termsAndConditions);

  await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will actually be delivered/i));
});
