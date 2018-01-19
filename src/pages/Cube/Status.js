import React from 'react';
import PropTypes from 'prop-types';
import { Alert, ProgressBar } from 'react-bootstrap';
import { FormattedNumber } from 'react-intl';

Status.propTypes = {
    listSize: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};

export default function Status(props) {
    const loadComplete = () => progress() === 100;
    const progress = () => props.listSize / props.total * 100;

    return (
        <div>
            <div style={{ marginBottom: '10px'}}>
                <strong>Records: </strong>
                <FormattedNumber value={props.listSize}/>
                <strong> / </strong>
                <FormattedNumber value={props.total}/>
            </div>
            {
                loadComplete() ?
                    <Alert bsStyle={loadComplete() ? 'success' : 'info'}
                           style={{ marginBottom: '0px', textAlign: 'center' }}>
                        <strong>{loadComplete() ? 'Complete' : 'Loading Records'}</strong>
                    </Alert>
                :
                    <ProgressBar style={{ marginTop: '10px', marginBottom: '0px' }}
                                 bsStyle="success"
                                 now={progress()} />
            }


        </div>
    );
}