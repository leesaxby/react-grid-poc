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
            scrollToColumn: undefined,
            useDynamicRowHeight: false
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
            useDynamicRowHeight,
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
          <div className={styles.headerCell} key={key} style={style}>
            { this._getHeaderText(columnIndex) }
          </div>
        );
    }

    _onColummSelect = (index) => {
        const { sortDirection } = this.state.sort;
        const selectedColName = Object.keys(this.props.list.get(0))[index];
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
