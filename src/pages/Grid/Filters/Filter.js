import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export default class Filter extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            value: ''
        };
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        onFilterChange: PropTypes.func.isRequired
    }

    render() {
        return (
            <FormGroup>
            <ControlLabel>{this.state.name}</ControlLabel>
            <FormControl name={this.state.name}
                         type="text"
                         placeholder="Filter..."
                         value={this.state.value}
                         onChange={this.onChange} />
            </FormGroup>
        );
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value
        });

        this.props.onFilterChange(e.target.name, e.target.value);
    }
}