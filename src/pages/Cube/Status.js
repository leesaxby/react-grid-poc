import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import { FormattedNumber } from 'react-intl';

Status.propTypes = {
    listSize: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};

export default function Status(props) {
    const loadComplete = () => props.listSize === props.total;

    return (
        <div>
            <div style={{ marginBottom: '10px'}}>
                <strong>Loaded: </strong>
                <FormattedNumber value={props.listSize}/>
            </div>
            <div  style={{ marginBottom: '10px' }}>
                <strong>Total: </strong>
                <FormattedNumber value={props.total}/>
            </div>
            <Alert bsStyle={loadComplete() ? 'success' : 'info'}
                   style={{ marginBottom: '0px', textAlign: 'center' }}>
                <strong>{loadComplete() ? 'Complete' : 'Loading Records'}</strong>
            </Alert>
        </div>
    );
}