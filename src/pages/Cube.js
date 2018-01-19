import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, Map } from 'immutable';
import { Grid as GridStyle, Row, Col, Panel } from 'react-bootstrap';
import GridTable from './Cube/GridTable';
import Status from './Cube/Status';
import Filter from './Cube/Filter';
import { generateList, updateSort, updateFilters } from '../modules/list';
import { getSortedList } from '../modules/list.selectors';

export class Cube extends PureComponent {
    constructor(props, context) {
        super(props, context);
    }

    static propTypes = {
        list: PropTypes.instanceOf(List).isRequired,
        status: PropTypes.instanceOf(Map).isRequired,
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
                        <Col lg={3}>
                            <Panel header="Status" bsStyle="primary">
                                <Status listSize={this.props.list.size}
                                        total={this.props.status.get('total')}/>
                            </Panel>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <GridTable list={this.props.list}
                                       sort={this.props.sort}
                                       onSort={this.props.updateSort}/>
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

const mapStateToProps = (state) => ({
    list: getSortedList(state),
    status: state.get('cube').get('status'),
    sort: state.get('cube').get('sort'),
    filters: state.get('filters'),
});

const mapDispatchToProps = (dispatch) => ({
    generateList: () => dispatch(generateList()),
    updateSort: (sort) => dispatch(updateSort(sort)),
    updateFilters: (filters) => dispatch(updateFilters(filters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cube);