import Immutable from 'immutable';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';

import { Grid, AutoSizer } from 'react-virtualized';

import cn from 'classnames';
import styles from './Grid.example.css';

const SortDirection = {ASC: 'ASC', DESC: 'DESC'};

export default class GridExample extends PureComponent {
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
      scrollToRow: undefined,
      useDynamicRowHeight: false,
    };

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

      <div>
        <button onClick={this._onSort}>sort</button>

          <input type="text"
            label="Scroll to column"
            name="onScrollToColumn"
            placeholder="Scroll to Column..."
            onChange={this._onScrollToColumnChange}
            value={scrollToColumn || ''}
          />
          <input type="text"
            label="Scroll to row"
            name="onScrollToRow"
            placeholder="Scroll to Row..."
            onChange={this._onScrollToRowChange}
            value={scrollToRow || ''}
          />

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
        </div>

    );
  }

  _cellRenderer = ({columnIndex, key, rowIndex, style}) => {
    if (columnIndex === 0) {
      return this._renderLeftSideCell({columnIndex, key, rowIndex, style});
    } else {
      return this._renderBodyCell({columnIndex, key, rowIndex, style});
    }
  }

  _getColumnWidth = ({index}) => {
    switch (index) {
      case 0:
        return 50;
      case 1:
        return 100;
      case 2:
        return 300;
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
      case 1:
        content = datum.index;
        break;
      case 2:
        content = datum.name;
        break;
      default:
        content = `${datum.random}`;
        break;
    }

    const classNames = cn(rowClass, styles.cell, {
      [styles.centeredCell]: columnIndex > 2,
    });

    return (
      <div className={classNames} key={key} style={style}>
        {content}
      </div>
    );
  }

  _renderLeftSideCell = ({key, rowIndex, style}) => {
    const datum = this._getDatum(rowIndex);

    const classNames = cn(styles.cell, styles.letterCell);

    // Don't modify styles.
    // These are frozen by React now (as of 16.0.0).
    // Since Grid caches and re-uses them, they aren't safe to modify.
    style = {
      ...style,
      backgroundColor: datum.color,
    };

    return (
      <div className={classNames} key={key} style={style}>
        {datum.name.charAt(0)}
      </div>
    );
  }

  _updateUseDynamicRowHeights = (value) => {
    this.setState({
      useDynamicRowHeight: value,
    });
  }

  _onColumnCountChange = (event) => {
    const columnCount = parseInt(event.target.value, 10) || 0;

    this.setState({columnCount});
  }

  _onRowCountChange = (event) => {
    const rowCount = parseInt(event.target.value, 10) || 0;

    this.setState({rowCount});
  }

  _onScrollToColumnChange = (event) =>{
    const {columnCount} = this.state;
    let scrollToColumn = Math.min(
      columnCount - 1,
      parseInt(event.target.value, 10),
    );

    if (isNaN(scrollToColumn)) {
      scrollToColumn = undefined;
    }

    this.setState({scrollToColumn});
  }

  _onScrollToRowChange = (event) => {
    const {rowCount} = this.state;
    let scrollToRow = Math.min(rowCount - 1, parseInt(event.target.value, 10));

    if (isNaN(scrollToRow)) {
      scrollToRow = undefined;
    }

    this.setState({scrollToRow});
  }

  _sortList = ({sortBy, sortDirection}) => {
    const sortedList = this.state.list
      .sortBy(item => item[sortBy])
      .update(
        list => (sortDirection === SortDirection.DESC ? list.reverse() : list),
      );

      const newList = Immutable.List(sortedList);
      this.setState({ list: newList,  scrollToRow: 0 });
  }

  _onSort = () => {
    this._sortList({ sortBy: 'index', sortDirection: 'DESC' });
  }

}
