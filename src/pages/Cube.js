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
    }

    static propTypes = {
        list: PropTypes.instanceOf(Immutable.List).isRequired,
        getList: PropTypes.func.isRequired,
        sort: PropTypes.instanceOf(Immutable.Map).isRequired,
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
                        <Sort sort={this.props.sort}
                              sortList={this.props.updateSort}/>

                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <GridTable list={this.props.list}/>
                        </Col>
                    </Row>
                </GridStyle>
            </div>
        );
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
    // TODO: Don't want to do unnecessary initial sort.
    return list.sortBy(item => item[sortBy])
               .update(
                   list => (sortDirection === SortDirection.DESC ? list.reverse() : list),
               );
};

const mapStateToProps = (state) => {
    const cube = state.get('cube');
    const sort = cube.get('sort');
    return {
        list: sortList( cube.get('list'), sort.get('sortBy'), sort.get('sortDirection') ),
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