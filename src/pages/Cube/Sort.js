import React from 'react';
import PropTypes from 'prop-types';
import { Panel, FormGroup, Radio, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import Immutable from 'immutable';

Sort.propTypes = {
    sort: PropTypes.instanceOf(Immutable.Map).isRequired,
    sortList: PropTypes.func.isRequired
};

export default function Sort(props) {

    const updateSort = (sortBy, sortDirection) => props.sortList({ sortBy, sortDirection });

    const onSortByChange = (e) => updateSort(e.target.value, props.sort.get('sortDirection'));

    const onDirectionChange = (sortDirection) => updateSort(props.sort.get('sortBy'), sortDirection);

    return (
        <Panel header="Sort" bsStyle="primary">
            <FormGroup>
                <FormGroup onChange={onSortByChange}
                           value={props.sort.get('sortBy')}>

                    <Radio name="sortFieldGroup"
                           value="index"
                           defaultChecked={props.sort.get('sortBy') === 'index'}
                           inline>
                        Index
                    </Radio>

                    <Radio name="sortFieldGroup"
                           value="name"
                           defaultChecked={props.sort.get('sortBy') === 'name'}
                           inline>
                        Name
                    </Radio>

                    <Radio name="sortFieldGroup"
                           defaultChecked={props.sort.get('sortBy') === 'age'}
                           value="age"
                           inline>
                        Age
                    </Radio>

                </FormGroup>

                <ToggleButtonGroup type="radio"
                                    name="sortToggle"
                                    role="radiogroup"
                                    value={props.sort.get('sortDirection')}
                                    onChange={onDirectionChange}>

                    <ToggleButton value="ASC"
                                  role="radio">
                        ASC
                    </ToggleButton>

                    <ToggleButton value="DESC"
                                  role="radio">
                        DESC
                    </ToggleButton>

                </ToggleButtonGroup>
            </FormGroup>
        </Panel>
    );
}
