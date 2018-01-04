import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import Immutable from 'immutable';
import { Grid, AutoSizer } from 'react-virtualized';

import cn from 'classnames';
import styles from './Cube.css';

export default class GridTable extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      list: props.list,
      columnCount: 1000,
      height: 600,
      overscanColumnCount: 0,
      overscanRowCount: 10,
      rowHeight: 40,
      rowCount: 1000000,
      scrollToColumn: undefined,
      scrollToRow: 0,
      useDynamicRowHeight: false,
    };

  }

  static propTypes = {
      list: PropTypes.instanceOf(Immutable.List).isRequired
  }

  render() {
    const {
      columnCount,
      height,
      overscanColumnCount,
      overscanRowCount,
      rowHeight,
      rowCount,
      scrollToColumn,
      scrollToRow,
      useDynamicRowHeight,
    } = this.state;

    return (

                            <AutoSizer disableHeight>
                              {({width}) => (
                                  <Grid
                                    cellRenderer={this._cellRenderer}
                                    className={styles.BodyGrid}
                                    columnWidth={this._getColumnWidth}
                                    columnCount={columnCount}
                                    height={height}
                                    noContentRenderer={this._noContentRenderer}
                                    overscanColumnCount={overscanColumnCount}
                                    overscanRowCount={overscanRowCount}
                                    rowHeight={useDynamicRowHeight ? this._getRowHeight : rowHeight}
                                    rowCount={rowCount}
                                    scrollToColumn={scrollToColumn}
                                    scrollToRow={scrollToRow}
                                    width={width}
                                  />
                              )}
                            </AutoSizer>


    );
  }

  _cellRenderer = ({columnIndex, key, rowIndex, style}) => {
      return this._renderBodyCell({columnIndex, key, rowIndex, style});
  }

  _onColummSelect = (index) => {
    const { sortDirection } = this.state.sort;
    const selectedColName = Object.keys(this.state.list.get(0))[index];
    this.setState({
      sort: {
        sortDirection,
        sortBy: selectedColName
      }
    });
  }

  _getColumnWidth = ({index}) => {
    switch (index) {
      case 0:
        return 70;
      case 1:
        return 150;
      case 2:
        return 150;
      case 3:
        return 50;
      case 4:
        return 100;
      default:
        return 300;
    }
  }

  _getDatum = (index) => {
    const {list} = this.state;
    return list.get(index % list.size);
  }

  _getRowClassName = (row) => {
    return row % 2 === 0 ? styles.evenRow : styles.oddRow;
  }

  _getRowHeight = ({index}) => {
    return this._getDatum(index).size;
  }

  _noContentRenderer = () => {
    return <div className={styles.noCells}>No cells</div>;
  }

  _renderBodyCell = ({columnIndex, key, rowIndex, style}) => {
    const rowClass = this._getRowClassName(rowIndex);
    const datum = this._getDatum(rowIndex);

    let content;

    switch (columnIndex) {
      case 0:
        content = datum.index;
        break;
      case 1:
        content = datum.name;
        break;
      case 2:
        content = datum.otherNames;
        break;
      case 3:
        content = datum.age;
        break;
      case 4:
        content = datum.date;
        break;
      case 5:
        content = datum.random2;
        break;
      case 6:
        content = datum.random3;
        break;
      case 7:
        content = datum.random4;
        break;
      case 8:
        content = datum.random5;
        break;
      default:
        content = datum.random;
        break;
    }

    const classNames = cn(rowClass, styles.cell, {
      [styles.centeredCell]: columnIndex > 2,
    });

    return (
      <div onClick={() => {this._onColummSelect(columnIndex);}} className={classNames} key={key} style={style}>
        {content}
      </div>
    );
  }



}
