import React from 'react';
import Immutable from 'immutable';
import Cube from './pages/Cube';
import {generateRandomList} from './utils';

export function App() {
    return (
        <Cube list={Immutable.List(generateRandomList())}/>
    );
}