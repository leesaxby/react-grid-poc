import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

export default class Filter extends React.Component {
    static propTypes = {
        filter: PropTypes.instanceOf(Map).isRequired,
        onFilterChange: PropTypes.func.isRequired
    };

    constructor (props) {
        super(props);
        this.timeout;
        this.state = {
            value: this.props.filter.get('value')
        };
    }

    updateFilter = (value) => {
        this.props.onFilterChange(
            this.props.filter.merge({
                field: this.props.filter.get('field'),
                type: this.props.filter.get('type'),
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
        const filter = this.props.filter;
        return (
            <FormGroup>
                <ControlLabel>{filter.get('label')}</ControlLabel>
                    <FormControl name={filter.get('label')}
                                 type={filter.get('type')}
                                 placeholder="Filter..."
                                 value={this.state.value}
                                 onChange={this.onChange} />
            </FormGroup>
        );
    }

}
