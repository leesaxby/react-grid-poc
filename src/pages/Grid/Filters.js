import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import { ControlLabel, FormControl, FormGroup, Panel } from 'react-bootstrap';
import Filter from './Filters/Filter';

export default class GridTable extends PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: '',
            age: '',
            random: '',
            date: ''
        };
    }

    static propTypes = {
        onFilterChange: PropTypes.func.isRequired
    }

    render() {
        return (
            <Panel header="Filters" bsStyle="primary">
                <Filter name="name" onFilterChange={this.props.onFilterChange}/>
                <Filter name="age" onFilterChange={this.props.onFilterChange}/>
                <Filter name="date" onFilterChange={this.props.onFilterChange}/>
                <Filter name="random" onFilterChange={this.props.onFilterChange}/>
            </Panel>
        );
    }
}
