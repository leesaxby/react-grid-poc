import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

Filter.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onFilterChange: PropTypes.func.isRequired
};


export default function Filter(props) {
    const onChange = (e) => {
        props.onFilterChange(
            Map({
                name: props.name,
                type: props.type,
                value: e.target.value,
            })
        );
    };

    return (
        <FormGroup>
            <ControlLabel>{props.name}</ControlLabel>
                <FormControl name={props.name}
                             type={props.type}
                             placeholder="Filter..."
                             value={props.value}
                             onChange={onChange} />
        </FormGroup>
    );
}
