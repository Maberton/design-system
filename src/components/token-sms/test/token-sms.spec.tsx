import { newSpecPage } from '@stencil/core/testing';
import { TokenSms } from '../token-sms';

describe('token-sms', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TokenSms],
      html: `<token-sms></token-sms>`,
    });
    expect(page.root).toEqualHtml(`
      <token-sms>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </token-sms>
    `);
  });
});
