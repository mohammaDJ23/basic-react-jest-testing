import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import OrderEntry from '../OrderEntry';

test('update scoop subtotal when scoops change', async function () {
  render(<Options optionType={'scoops'} />);

  // exact: false means find this element that the text of that
  // is contains "Scoops total: $" not the entire the text

  const scoopSubtitle = screen.getByText('Scoops total: $', { exact: false });

  expect(scoopSubtitle).toHaveTextContent('0.00');

  const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  expect(scoopSubtitle).toHaveTextContent('2.00');

  const chocolateInput = await screen.findByRole('spinbutton', { name: 'Chocolate' });

  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');

  expect(scoopSubtitle).toHaveTextContent('6.00');
});

test('update toppings subtotal when toppings change', async function () {
  render(<Options optionType={'toppings'} />);

  const toppingsSubtitle = screen.getByText('Toppings total: $', { exact: false });

  expect(toppingsSubtitle).toHaveTextContent('0.00');

  const cherriesInput = await screen.findByRole('checkbox', { name: 'Cherries' });

  userEvent.click(cherriesInput);

  expect(toppingsSubtitle).toHaveTextContent('1.50');

  const hotFudgeInput = screen.getByRole('checkbox', { name: 'Hot fudge' });

  userEvent.click(hotFudgeInput);

  expect(toppingsSubtitle).toHaveTextContent('3.00');

  userEvent.click(hotFudgeInput);

  expect(toppingsSubtitle).toHaveTextContent('1.50');
});

describe('grand total', function () {
  test('grand total updates properly if scoop is add first', async function () {
    render(<OrderEntry />);

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    const cherriesInput = await screen.findByRole('checkbox', { name: 'Cherries' });

    userEvent.click(cherriesInput);

    const grandTotal = screen.getByRole('heading', { name: /grand total/i });

    expect(grandTotal).toHaveTextContent('3.50');
  });

  test('grand total updates properly if topping is add first', async function () {
    render(<OrderEntry />);

    const cherriesInput = await screen.findByRole('checkbox', { name: 'Cherries' });

    userEvent.click(cherriesInput);

    const vanillaInput = await screen.findByRole('spinbutton', { name: 'Vanilla' });

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, '1');

    const grandTotal = screen.getByRole('heading', { name: /grand total/i });

    expect(grandTotal).toHaveTextContent('3.50');
  });

  test('grand total updates properly if item is removed', async function () {
    render(<OrderEntry />);

    const cherriesInput = await screen.findByText(/cherries/i);

    userEvent.click(cherriesInput);

    const grandTotal = screen.getByRole('heading', { name: /grand total/i });

    expect(grandTotal).toHaveTextContent('1.50');

    userEvent.click(cherriesInput);

    expect(grandTotal).toHaveTextContent('0.00');
  });
});
