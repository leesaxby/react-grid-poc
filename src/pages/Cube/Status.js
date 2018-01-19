import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { FormattedNumber } from 'react-intl';

Status.propTypes = {
    listSize: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};

export default function Status(props) {
    return (
        <div>
            <Alert style={{ marginBottom: '10px' }}>
                <strong>Total: </strong>
                <FormattedNumber value={props.total}/>
            </Alert>
            <Alert style={{ marginBottom: '10px' }}>
                <strong>Loaded: </strong>
                <FormattedNumber value={props.listSize}/>
            </Alert>
            <Alert bsStyle="success" style={{ marginBottom: '0px', textAlign: 'center' }}>
                <strong>Loading Records</strong>
            </Alert>
        </div>
    );
}