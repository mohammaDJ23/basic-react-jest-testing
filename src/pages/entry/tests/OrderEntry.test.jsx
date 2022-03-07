import { render, screen, waitFor } from '../../../test-utils/testing-library-utils';
import OrderEntry from '../OrderEntry';
import { rest } from 'msw';
import { server } from '../../../mocks/server';
import userEvent from '@testing-library/user-event';

test('disable order button if there are no scoops ordered', async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  // order button should be disabled at first, even before options load
  let orderButton = screen.getByRole('button', { name: /order sundae/i });
  expect(orderButton).toBeDisabled();

  // expect button to be enabled after adding scoop
  const vanillaInput = await screen.findByRole('spinbutton', {
    name: 'Vanilla',
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');
  expect(orderButton).toBeEnabled();

  // expect button to be disabled again after removing scoop
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '0');
  expect(orderButton).toBeDisabled();
});

test('handles error for scoops and toppings routes', async function () {
  server.resetHandlers(
    rest.get('http://localhost:3030/scoops', (req, res, ctx) => {
      return res(ctx.status(500));
    }),

    rest.get('http://localhost:3030/toppings', (req, res, ctx) => {
      return res(ctx.status(500));
    }),
  );

  render(<OrderEntry />);

  await waitFor(async function () {
    const alerts = await screen.findAllByRole('alert');

    expect(alerts).toHaveLength(2);
  });
});

test('Order sundae should be disable if there is no order', async function () {
  render(<OrderEntry setOrderPhase={jest.fn()} />);

  const scoopsTotal = screen.getByText('Scoops total:', { exact: false });

  expect(scoopsTotal).toHaveTextContent('0.00');

  const toppingsTotal = screen.getByText('Toppings total:', { exact: false });

  expect(toppingsTotal).toHaveTextContent('0.00');

  const orderSundae = screen.getByRole('button', { name: 'Order Sundae!' });

  expect(orderSundae).toBeDisabled();

  await screen.findAllByRole('spinbutton');
});
