import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

test('Order phases for happy path', async function () {
  render(<App />);

  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  const cherriesInput = await screen.findByRole('checkbox', { name: 'Cherries' });

  userEvent.click(cherriesInput);

  const orderButton = screen.getByRole('button', { name: 'Order Sundae!' });

  userEvent.click(orderButton);

  const toppiesOrder = screen.getByRole('heading', { name: 'Toppings: $1.50' });

  expect(toppiesOrder).toBeInTheDocument();

  const scoopesOrder = screen.getByRole('heading', { name: 'Scoops: $2.00' });

  expect(scoopesOrder).toBeInTheDocument();

  expect(screen.getByText('1 Vanilla')).toBeInTheDocument();
  expect(screen.getByText('Cherries')).toBeInTheDocument();

  const termsAndCondition = screen.getByRole('checkbox', { name: /terms and conditions/i });

  userEvent.click(termsAndCondition);

  const confirmOrderButton = screen.getByRole('button', { name: /confirm order/i });

  userEvent.click(confirmOrderButton);

  const loading = screen.getByText('Loading');

  expect(loading).toBeInTheDocument();

  const thankYouHeader = await screen.findByRole('heading', { name: /thank you/i });

  expect(thankYouHeader).toBeInTheDocument();

  const notLoading = screen.queryByText('loading');

  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);

  expect(orderNumber).toBeInTheDocument();

  const newOrderButton = screen.getByRole('button', { name: /new order/i });

  userEvent.click(newOrderButton);

  const scoopsTotal = await screen.findByText('Scoops total: $0.00');

  expect(scoopsTotal).toBeInTheDocument();

  const toppingsTotal = screen.getByText('Toppings total: $0.00');

  expect(toppingsTotal).toBeInTheDocument();

  await screen.findByRole('spinbutton', { name: 'Vanilla' });

  await screen.findByRole('checkbox', { name: 'Cherries' });
});

test('Toppings header is not on summary page if no toppings ordered', async function () {
  render(<App />);

  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  const orderSummaryButton = screen.getByRole('button', { name: /order sundae/i });

  userEvent.click(orderSummaryButton);

  const scoopsHeading = screen.getByRole('heading', { name: 'Scoops: $2.00' });

  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole('heading', { name: /toppings/i });

  expect(toppingsHeading).not.toBeInTheDocument();
});
