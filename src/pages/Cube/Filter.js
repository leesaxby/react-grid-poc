import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export default class Filter extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        onFilterChange: PropTypes.func.isRequired
    };

    constructor (props) {
        super(props);
        this.timeout;
        this.state = {
            value: this.props.value
        };
    }

    updateFilter = (value) => {
        this.props.onFilterChange(
            Map({
                name: this.props.name,
                type: this.props.type,
                value: value,
            })
        );

    };

    onChange = (e) => {
        this.setState({
            value: e.target.value
        });

        clearTimeout(this.timeout);
        this.timeout = setTimeout((value) => {
            this.updateFilter(value);
        }, 500, e.target.value);
    };

    render() {
        return (
            <FormGroup>
                <ControlLabel>{this.props.name}</ControlLabel>
                    <FormControl name={this.props.name}
                                 type={this.props.type}
                                 placeholder="Filter..."
                                 value={this.state.value}
                                 onChange={this.onChange} />
            </FormGroup>
        );
    }

}
