import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { Grid as GridStyle, Row, Col, Panel } from 'react-bootstrap';
import GridTable from './Cube/GridTable';
import Filter from './Cube/Filter';
import Sort from './Cube/Sort';
import { getList, updateSort } from '../modules/list';

const SortDirection = {ASC: 'ASC', DESC: 'DESC'};

export class Cube extends PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            // TODO: Currently updating scroll to row to force grid to
            // refresh after change. Find better way.
            scrollToRow: 0
        };
    }

    static propTypes = {
        list: PropTypes.instanceOf(Immutable.List).isRequired,
        getList: PropTypes.func.isRequired,
        updateSort: PropTypes.func.isRequired,
    }

    componentWillMount = () => {
        this.props.getList();
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
                                sortList={this._handleSort}/>

                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <GridTable scrollRow={this.state.scrollToRow} list={this.props.list}/>
                        </Col>
                    </Row>
                </GridStyle>
            </div>

        );
    }

    _handleSort = (sortBy, sortDirection) => {
        this.props.updateSort({ field: sortBy, direction: sortDirection  });
    }

    _handleFilter = (name, value) => {
        let { scrollToRow } = this.state;
        const list = this.props.list.filter(({ [name]: col }) => col.includes(value));

        scrollToRow = !scrollToRow ? 1 : 0;

        if (list.size && value.length >= 2) {
        this.setState({ list,  scrollToRow });
        }

        if (!list.size || value.length === 0) {
        this.setState({ list: this.props.list,  scrollToRow });
        }
    }

}

const sortList = (list, sortBy, sortDirection) => {
    // Don't want to do unnecessary initial sort.
    return list.sortBy(item => item[sortBy])
               .update(
                   list => (sortDirection === SortDirection.DESC ? list.reverse() : list),
               );
};

const mapStateToProps = (state) => {
    const cube = state.get('cube');
    return {
        list: sortList( cube.get('list'), 'index', 'DESC' ),
        sort: cube.get('sort')
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getList: () => dispatch(getList()),
        updateSort: (sort) => dispatch(updateSort(sort))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cube);