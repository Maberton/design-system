import { newSpecPage } from '@stencil/core/testing';
import { InputDigitos } from '../input-digitos';

describe('input-digitos', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InputDigitos],
      html: `<input-digitos></input-digitos>`,
    });
    expect(page.root).toEqualHtml(`
      <input-digitos>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </input-digitos>
    `);
  });
});
