import React, {PureComponent} from 'react';
import Immutable from 'immutable';
import { Grid as GridStyle, Row, Col, Panel } from 'react-bootstrap';
import GridTable from './Cube/GridTable';
import Filter from './Cube/Filter';
import Sort from './Cube/Sort';

import {generateRandomList} from '../utils';

const list = Immutable.List(generateRandomList());

const SortDirection = {ASC: 'ASC', DESC: 'DESC'};

export default class Cube extends PureComponent {
  constructor(props, context) {
    super(props, context);
  }

  render() {

    return (

      <div>
            <GridStyle fluid={true} style={{ 'marginTop': '10px' }}>
                <Row>
                    <Col lg={2}>
                        <Panel header="Filters" bsStyle="primary">
                            <Filter name="name" onFilterChange={this._handleFilter}/>
                            <Filter name="age" onFilterChange={this._handleFilter}/>
                            <Filter name="date" onFilterChange={this._handleFilter}/>
                            <Filter name="random" onFilterChange={this._handleFilter}/>
                        </Panel>
                    </Col>
                    <Col lg={2}>
                      <Sort onSort={this._onSort}
                            sortList={this._sortList}/>

                    </Col>
                </Row>
                <Row>
                    <Col lg={12}>
                        <Panel header="Grid" bsStyle="primary" className="data-grid">
                            <GridTable list={list}/>
                        </Panel>
                    </Col>
                </Row>
            </GridStyle>
        </div>

    );
  }

  _sortList = (sortBy, sortDirection) => {
    let { scrollToRow } = this.state;
    const sortedList = this.state.list
      .sortBy(item => item[sortBy])
      .update(
        list => (sortDirection === SortDirection.DESC ? list.reverse() : list),
      );

      scrollToRow = !scrollToRow ? 1 : 0;
      this.setState({ list: sortedList,  scrollToRow });
  }

  _handleFilter = (name, value) => {
    let { scrollToRow } = this.state;
    const list = this.state.list.filter(({ [name]: col }) => col.includes(value));

    scrollToRow = !scrollToRow ? 1 : 0;

    if (list.size && value.length >= 2) {
      this.setState({ list,  scrollToRow });
    }

    if (!list.size || value.length === 0) {
      this.setState({ list: this.props.list,  scrollToRow });
    }
  }

}
