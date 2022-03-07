import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';

import Options from '../Options';

// test("don't update total if scoops input is invalid", async () => {
//   render(<Options optionType="scoops" />);

//   // expect button to be enabled after adding scoop
//   const vanillaInput = await screen.findByRole('spinbutton', {
//     name: 'Vanilla',
//   });
//   userEvent.clear(vanillaInput);
//   userEvent.type(vanillaInput, '-1');

//   // make sure scoops subtotal hasn't updated
//   const scoopsSubtotal = screen.getByText('Scoops total: $0.00');
//   expect(scoopsSubtotal).toBeInTheDocument();
// });

test('Display image  for each scoop option from server', async function () {
  render(<Options optionType={'scoops'} />);

  const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i });

  expect(scoopImages).toHaveLength(2);

  const allText = scoopImages.map(element => element.alt);

  expect(allText).toEqual(['Chocolate scoop', 'Vanilla scoop']);
});

test('Displays image for each toppings option from server', async function () {
  render(<Options optionType={'toppings'} />);

  const toppingsImages = await screen.findAllByRole('img', { name: /topping$/i });

  expect(toppingsImages).toHaveLength(3);

  const allText = toppingsImages.map(element => element.alt);

  expect(allText).toEqual(['Cherries topping', 'M&Ms topping', 'Hot fudge topping']);
});
