import React from 'react';
import Immutable from 'immutable';
import {generateRandomList} from './utils';

import GridTable from './pages/Grid';

const list = Immutable.List(generateRandomList());

export function App() {
    return (
        <GridTable list={list} />
    );
}