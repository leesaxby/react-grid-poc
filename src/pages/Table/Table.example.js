import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';

import { AutoSizer, Column, SortDirection, SortIndicator, Table } from 'react-virtualized';
import styles from './Table.example.css';

export default class TableExample extends PureComponent {
  constructor(props, context) {
    super(props, context);

    const sortBy = 'index';
    const sortDirection = SortDirection.ASC;

    this.state = {
      list: props.list,
      disableHeader: false,
      headerHeight: 30,
      height: 270,
      hideIndexRow: false,
      overscanRowCount: 10,
      rowHeight: 40,
      rowCount: 1000000,
      scrollToIndex: undefined,
      sortBy,
      sortDirection,
      useDynamicRowHeight: false,
    };

    this.state.sortedList = this._sortList({sortBy, sortDirection});

    this._getRowHeight = this._getRowHeight.bind(this);
    this._headerRenderer = this._headerRenderer.bind(this);
    this._noRowsRenderer = this._noRowsRenderer.bind(this);
    this._onRowCountChange = this._onRowCountChange.bind(this);
    this._onScrollToRowChange = this._onScrollToRowChange.bind(this);
    this._rowClassName = this._rowClassName.bind(this);
    this._sort = this._sort.bind(this);
    this._sortList = this._sortList.bind(this);
  }

  render() {
    const {
      disableHeader,
      headerHeight,
      height,
      hideIndexRow,
      overscanRowCount,
      rowHeight,
      rowCount,
      scrollToIndex,
      sortBy,
      sortDirection,
      sortedList,
      useDynamicRowHeight,
    } = this.state;

    const rowGetter = ({index}) => this._getDatum(sortedList, index);

    return (
      <div>
        <input
          type="text"
          name="onScrollToRow"
          placeholder="Scroll to Row..."
          onChange={this._onScrollToRowChange}
          value={scrollToIndex || ''}
        />

        <AutoSizer disableHeight>
          {({width}) => (
            <Table
              ref="Table"
              disableHeader={disableHeader}
              headerClassName={styles.headerColumn}
              headerHeight={headerHeight}
              height={height}
              noRowsRenderer={this._noRowsRenderer}
              overscanRowCount={overscanRowCount}
              rowClassName={this._rowClassName}
              rowHeight={useDynamicRowHeight ? this._getRowHeight : rowHeight}
              rowGetter={rowGetter}
              rowCount={rowCount}
              scrollToIndex={scrollToIndex}
              sort={this._sort}
              sortBy={sortBy}
              sortDirection={sortDirection}
              width={width}>
              {!hideIndexRow && (
                <Column
                  label="Index"
                  cellDataGetter={({rowData}) => rowData.index}
                  dataKey="index"
                  disableSort={!this._isSortEnabled()}
                  width={60}
                />
              )}
              <Column
                dataKey="name"
                disableSort={!this._isSortEnabled()}
                headerRenderer={this._headerRenderer}
                width={90}
              />
              <Column
                label="Random"
                dataKey="random"
                disableSort={!this._isSortEnabled()}
                width={90}
              />
              <Column
                label="Random"
                dataKey="random"
                disableSort={!this._isSortEnabled()}
                width={90}
              />
              <Column
                width={210}
                disableSort
                label="The description label is really long so that it will be truncated"
                dataKey="random"
                className={styles.exampleColumn}
                cellRenderer={({cellData}) => cellData}
                flexGrow={1}
              />
            </Table>
          )}
        </AutoSizer>
      </div>
    );
  }

  _getDatum(list, index) {
    return list.get(index % list.size);
  }

  _getRowHeight({index}) {
    const {list} = this.state;

    return this._getDatum(list, index).size;
  }

  _headerRenderer({dataKey, sortBy, sortDirection}) {
    return (
      <div>
        Full Name
        {sortBy === dataKey && <SortIndicator sortDirection={sortDirection} />}
      </div>
    );
  }

  _isSortEnabled() {
    const { list, rowCount } = this.state;

    return true//rowCount <= list.size;
  }

  _noRowsRenderer() {
    return <div className={styles.noRows}>No rows</div>;
  }

  _onRowCountChange(event) {
    const rowCount = parseInt(event.target.value, 10) || 0;

    this.setState({rowCount});
  }

  _onScrollToRowChange(event) {
    const {rowCount} = this.state;
    let scrollToIndex = Math.min(
      rowCount - 1,
      parseInt(event.target.value, 10),
    );

    if (isNaN(scrollToIndex)) {
      scrollToIndex = undefined;
    }

    this.setState({scrollToIndex});
  }

  _rowClassName({index}) {
    if (index < 0) {
      return styles.headerRow;
    } else {
      return index % 2 === 0 ? styles.evenRow : styles.oddRow;
    }
  }

  _sort({sortBy, sortDirection}) {
    const sortedList = this._sortList({sortBy, sortDirection});

    this.setState({sortBy, sortDirection, sortedList});
  }

  _sortList({sortBy, sortDirection}) {
    console.log(this.state)
    const {list} = this.state;

    return list
      .sortBy(item => item[sortBy])
      .update(
        list => (sortDirection === SortDirection.DESC ? list.reverse() : list),
      );
  }

  _updateUseDynamicRowHeight(value) {
    this.setState({
      useDynamicRowHeight: value,
    });
  }
}
