import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Panel, FormGroup, Radio, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';


export default class Sort extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            sortDirection: 'ASC',
            sortBy: 'name'
        };
    }

    static propTypes = {
        sortList: PropTypes.func.isRequired
    }

    render() {
        return (
            <Panel header="Sort" bsStyle="primary">
                <FormGroup>
                    <FormGroup onChange={this.onSortByChange}
                               value={this.state.sortBy}>

                        <Radio name="sortFieldGroup"
                               value="index"
                               defaultChecked={this.state.sortBy === 'index'}
                               inline>
                            Index
                        </Radio>

                        <Radio name="sortFieldGroup"
                               value="name"
                               defaultChecked={this.state.sortBy === 'name'}
                               inline>
                            Name
                        </Radio>

                        <Radio name="sortFieldGroup"
                               defaultChecked={this.state.sortBy === 'age'}
                               value="age"
                               inline>
                            Age
                        </Radio>

                    </FormGroup>

                    <ToggleButtonGroup type="radio"
                                       name="sortToggle"
                                       role="radiogroup"
                                       value={this.state.sortDirection}
                                       onChange={this.onDirectionChange}>

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

    updateSort = (sortBy, sortDirection) => {
        this.setState({
            sortDirection,
            sortBy
        });

        this.props.sortList({ sortBy, sortDirection });
    }

    onSortByChange = (e) => this.updateSort(e.target.value, this.state.sortDirection);

    onDirectionChange = (sortDirection) => this.updateSort(this.state.sortBy, sortDirection)

}