import React from 'react';
import Immutable from 'immutable';
import {generateRandomList} from './utils';

import Cube from './pages/Cube';

const list = Immutable.List(generateRandomList());

export function App() {
    return (
        <Cube list={list} />
    );
}