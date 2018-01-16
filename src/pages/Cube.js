import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import { Grid as GridStyle, Row, Col, Panel } from 'react-bootstrap';
import GridTable from './Cube/GridTable';
import Filter from './Cube/Filter';
import Sort from './Cube/Sort';
import { generateList, updateSort, updateFilters } from '../modules/list';
import { getFilteredList } from '../modules/list.selectors';

const SortDirection = {ASC: 'ASC', DESC: 'DESC'};

export class Cube extends PureComponent {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        list: PropTypes.instanceOf(List).isRequired,
        generateList: PropTypes.func.isRequired,
        sort: PropTypes.instanceOf(Map).isRequired,
        updateSort: PropTypes.func.isRequired,
        filters: PropTypes.instanceOf(List).isRequired,
        updateFilters: PropTypes.func.isRequired,
    }

    componentWillMount = () => {
        this.props.generateList();
    }

    render() {
        return (
            <div>
                <GridStyle fluid={true} style={{ 'marginTop': '10px' }}>
                    <Row>
                        <Col lg={2}>
                            <Panel header="Filters" bsStyle="primary">
                                {this.createFilters(this.props.filters)}
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

    createFilters = (filters) => {
        return filters.map(x => {
            return (
                <Filter key={x.get('name')}
                        name={x.get('name')}
                        type={x.get('type')}
                        value={x.get('value')}
                        onFilterChange={this.props.updateFilters}/>
            );
        });
    }
}



const sortList = (list, sortBy, sortDirection) => {
    return list.sortBy(item => item[sortBy])
               .update(
                   list => (sortDirection === SortDirection.DESC ? list.reverse() : list),
               );
};

const mapStateToProps = (state) => {
    const cube = state.get('cube');
    const filters = state.get('filters');
    return {
        list: getFilteredList(state),
        sort: cube.get('sort'),
        filters: filters,
    };
};

const mapDispatchToProps = (dispatch) => ({
    generateList: () => dispatch(generateList()),
    updateSort: (sort) => dispatch(updateSort(sort)),
    updateFilters: (filters) => dispatch(updateFilters(filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cube);