import React from 'react';
import PropTypes from 'prop-types';
import { FormattedNumber } from 'react-intl';

StatusText.propTypes = {
    label: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};

export default function StatusText(props) {
    return (
        <div style={{ marginBottom: '10px'}}>
            <strong>{props.label}: </strong>
            <FormattedNumber value={props.size}/>
            <strong> / </strong>
            <FormattedNumber value={props.total}/>
        </div>
    );
}