import React from 'react';
import PropTypes from 'prop-types';
import { Alert, ProgressBar } from 'react-bootstrap';
import { FormattedNumber } from 'react-intl';

import StatusText from './Status/StatusText';

Status.propTypes = {
    totalListSize: PropTypes.number.isRequired,
    listSize: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
};

export default function Status(props) {
    const loadComplete = () => progress() === 100;
    const progress = () => props.totalListSize / props.total * 100;

    return (
        <div>
            <StatusText label="Records"
                        size={props.totalListSize}
                        total={props.total}/>
            <StatusText label="Filtered"
                        size={props.listSize}
                        total={props.total}/>
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