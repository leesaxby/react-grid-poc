import React from 'react';
import Immutable from 'immutable';
import {generateRandomList} from './utils';

import GridExample from './pages/Grid/Grid.example';

const list = Immutable.List(generateRandomList());

export function App() {
    return (
        <GridExample list={list} />
    );
}