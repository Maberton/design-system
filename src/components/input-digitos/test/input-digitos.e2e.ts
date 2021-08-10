import { newE2EPage } from '@stencil/core/testing';

describe('input-digitos', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<input-digitos></input-digitos>');

    const element = await page.find('input-digitos');
    expect(element).toHaveClass('hydrated');
  });
});
