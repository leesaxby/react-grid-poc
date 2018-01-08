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

              <FormGroup onChange={this.onSortFieldChange}
                         value={this.state.sortBy}>
                <Radio name="sortFieldGroup"
                       value="index"
                       inline>
                  Index
                </Radio>
                <Radio name="sortFieldGroup"
                       value="name"
                       inline>
                  Name
                </Radio>
                <Radio name="sortFieldGroup"
                       value="age"
                       inline>
                  Age
                </Radio>
              </FormGroup>

                <ToggleButtonGroup type="radio"
                                  name="sortToggle"
                                  role="radiogroup"
                                  value={this.state.sortDirection}
                                  onChange={this.onSort}>

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

    onSortFieldChange = (e) => {
        const { sortDirection } = this.state;

        this.setState({
            sortDirection,
            sortBy: e.target.value
        });
      }

    onSort = (sortDirection) => {
        const { sortBy } = this.state;

        this.setState({
            sortDirection,
            sortBy
        });

        this.props.sortList( sortBy, sortDirection );
    }

}