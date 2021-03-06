import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import Immutable from 'immutable';
import { Grid, AutoSizer, ScrollSync } from 'react-virtualized';

import cn from 'classnames';
import styles from './Cube.css';

export default class GridTable extends PureComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            columnCount: 1000,
            height: 600,
            overscanColumnCount: 10,
            overscanRowCount: 10,
            rowHeight: 40,
            rowCount: 1000000,
            useDynamicRowHeight: false,
            scrollToRow: 0,
        };
    }

    static propTypes = {
        list: PropTypes.instanceOf(Immutable.List).isRequired,
        onSort: PropTypes.func.isRequired,
        onUpdateRecord: PropTypes.func.isRequired,
    }

    render() {
        const {
            columnCount,
            height,
            overscanColumnCount,
            overscanRowCount,
            rowHeight,
            useDynamicRowHeight,
            scrollToRow,
        } = this.state;

        return (
            <ScrollSync>
                {({
                    onScroll,
                    scrollLeft
                }) => {

                    return (
                        <AutoSizer disableHeight>
                            {({width}) => (
                            <div>
                                <div
                                    style={{
                                        backgroundColor: '#337ab7',
                                        color: '#fff',
                                        border: '1px solid #337ab7',
                                        height: rowHeight,
                                        width: width,
                                    }}>
                                    <Grid className={styles.HeaderGrid}
                                          columnWidth={this._getColumnWidth}
                                          columnCount={columnCount}
                                          height={rowHeight}
                                          overscanColumnCount={overscanColumnCount}
                                          cellRenderer={this._renderHeaderCell}
                                          rowHeight={rowHeight}
                                          rowCount={1}
                                          scrollLeft={scrollLeft}
                                          width={width}/>
                                </div>
                                <div>
                                    <Grid cellRenderer={this._cellRenderer}
                                          className={styles.BodyGrid}
                                          columnWidth={this._getColumnWidth}
                                          columnCount={columnCount}
                                          onScroll={onScroll}
                                          scrollToRow={scrollToRow}
                                          height={height}
                                          noContentRenderer={this._noContentRenderer}
                                          overscanColumnCount={overscanColumnCount}
                                          overscanRowCount={overscanRowCount}
                                          rowHeight={useDynamicRowHeight ? this._getRowHeight : rowHeight}
                                          rowCount={this.props.list.size}
                                          width={width}/>
                                </div>
                            </div>
                            )}
                        </AutoSizer>
                    );
                }}
            </ScrollSync>
        );
    }

    // Manually updating rows to fire grid update.
    // TODO: Grid doesn't auto update on sort
    updateScrollToRow = () => {
        this.setState({
            scrollToRow: this.state.scrollToRow ? 0 : 1
        });
    }

    updateRecord = (index, field, e) => {
        this.props.onUpdateRecord({
            updateIndex: index,
            field,
            value: e.target.value
        });
        this.updateScrollToRow();
    }

    _cellRenderer = ({columnIndex, key, rowIndex, style}) => {
        return this._renderBodyCell({columnIndex, key, rowIndex, style});
    }

    _renderHeaderCell = ({columnIndex, key, rowIndex, style}) => {
        if (columnIndex < 1) {
          return;
        }

        return this._renderLeftHeaderCell({columnIndex, key, rowIndex, style});
      }

    _renderLeftHeaderCell = ({columnIndex, key, style}) => {
        return (
          <div onClick={() => {this._onColummSelect(columnIndex);}} className={styles.headerCell} key={key} style={style}>
            { this._getHeaderText(columnIndex) }
          </div>
        );
    }

    _onColummSelect = (index) => {
        const sortBy = Object.keys(this.props.list.get(0))[index];
        this.props.onSort({ sortBy });
        this.updateScrollToRow();
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
        const {list} = this.props;
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

        if (datum) {
            let content;
            switch (columnIndex) {
                case 0:
                    content = datum.index;
                    break;
                case 1:
                    content = this._getEditableRow(datum.index, datum.name, 'name');
                    break;
                case 2:
                    content = this._getEditableRow(datum.index, datum.otherNames, 'otherNames');
                    break;
                case 3:
                    content = this._getEditableRow(datum.index, datum.age, 'age');
                    break;
                case 4:
                    content = this._getEditableRow(datum.index, datum.date, 'date');
                    break;
                case 5:
                    content = this._getEditableRow(datum.index, datum.random2, 'random2');
                    break;
                case 6:
                    content = this._getEditableRow(datum.index, datum.random3, 'random3');
                   break;
                case 7:
                    content = this._getEditableRow(datum.index, datum.random4, 'random4');
                    break;
                case 8:
                    content = this._getEditableRow(datum.index, datum.random5, 'random5');
                    break;
                default:
                    content = datum.random;
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
    }

    _getEditableRow = (index, data, field) => {
        return (
            <input type="text"
                   value={data}
                   // TODO: Better way than anon fn below.
                   onChange={(e) => {this.updateRecord(index, field, e);}}
                   style={{
                       width: '100%',
                       border: '0px',
                       background: 'none',
                       outline: 'none',
                   }}/>
        );
    }

    _getHeaderText = (colIndex) => {
        switch (colIndex) {
            case 0:
                return 'Index';
            case 1:
                return 'Name';
            case 2:
                return 'Other Name';
            case 3:
                return 'Age';
            case 4:
                return 'Date';
            default:
                return 'Random';
        }
    }
}
