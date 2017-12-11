// Return full element test id selector string.
export const el = (id) => `[data-test-id="${id}"]`;

// Return element count.
export const elCount = (page, elId) => page.$$eval(elId, el => el.length);

// Return true if component, inside provided wrapper, is rendered (has length => 1).
export const renderedInWrapper = (wrapper) => (Component) => wrapper.find(Component).length >= 1;