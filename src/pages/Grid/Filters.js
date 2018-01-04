import PropTypes from 'prop-types';
import React from 'react';
import { Panel } from 'react-bootstrap';
import Filter from './Filters/Filter';

export default function Filters({ onFilterChange }) {
    return (
        <Panel header="Filters" bsStyle="primary">
            <Filter name="name" onFilterChange={onFilterChange}/>
            <Filter name="age" onFilterChange={onFilterChange}/>
            <Filter name="date" onFilterChange={onFilterChange}/>
            <Filter name="random" onFilterChange={onFilterChange}/>
        </Panel>
    );
}

Filters.propTypes = {
    onFilterChange: PropTypes.func.isRequired
};
