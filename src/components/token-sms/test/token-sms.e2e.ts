import { newE2EPage } from '@stencil/core/testing';

describe('token-sms', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<token-sms></token-sms>');

    const element = await page.find('token-sms');
    expect(element).toHaveClass('hydrated');
  });
});
