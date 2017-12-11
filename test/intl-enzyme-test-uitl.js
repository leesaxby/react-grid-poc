/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */

import React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import { mount, shallow } from 'enzyme';
import { getMessages, DEFAULT_LOCALE } from '../i18n';


// You can pass your messages to the IntlProvider. Optional: remove if unneeded.
const messages = getMessages(DEFAULT_LOCALE);

// Create the IntlProvider to retrieve context for wrapping around.
// const intlProvider = new IntlProvider({ locale: DEFAULT_LOCALE });
const intlProvider = new IntlProvider({ locale: DEFAULT_LOCALE, messages }, {});

const { intl } = intlProvider.getChildContext();

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node) {
    return React.cloneElement(node, { intl });
}

export function shallowWithIntl(node, { context } = {}) {
    return shallow(
        nodeWithIntlProp(node),
        {
            context: Object.assign({}, context, {intl}),
        }
    );
}

export function mountWithIntl(node, { context, childContextTypes } = {}) {
    return mount(
        nodeWithIntlProp(node),
        {
            context: Object.assign({}, context, {intl}),
            childContextTypes: Object.assign({}, { intl: intlShape }, childContextTypes)
        }
    );
}