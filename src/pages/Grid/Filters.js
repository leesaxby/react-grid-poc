import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import { ControlLabel, FormControl, FormGroup, Panel } from 'react-bootstrap';

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

  render() {
      return (
          <Panel header="Filters" bsStyle="primary">
              <FormGroup>
                  <ControlLabel>Name</ControlLabel>
                  <FormControl id="search"
                               name="name"
                               type="text"
                               placeholder="Filter..."
                               value={this.state.name}
                               onChange={this._onFilterChange} />
              </FormGroup>
              <FormGroup>
                  <ControlLabel>Age</ControlLabel>
                  <FormControl id="search"
                              name="age"
                              type="text"
                              placeholder="Filter..."
                              value={this.state.age}
                              onChange={this._onFilterChange} />
              </FormGroup>
              <FormGroup>
                  <ControlLabel>Description</ControlLabel>
                  <FormControl id="search"
                               name="random"
                               type="text"
                               placeholder="Filter..."
                               value={this.state.random}
                               onChange={this._onFilterChange} />
              </FormGroup>
              <FormGroup>
                  <ControlLabel>Date</ControlLabel>
                  <FormControl id="search"
                               name="date"
                               type="date"
                               placeholder="Filter..."
                               value={this.state.date}
                               onChange={this._onFilterChange} />
                  </FormGroup>
          </Panel>
      );
  }

  _onFilterChange = (e) => {
       const updatedFilters = Object.assign({}, this.state, { [e.target.name]: e.target.value });
       this.setState(updatedFilters);
       this.props.onFilterChange(e.target.name, e.target.value);
  }

}
