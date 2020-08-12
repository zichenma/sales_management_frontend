import React from 'react';
import {TableWrapper} from './style';


const renderThead = colNames => {
    return (
        <thead>
        <tr>
         { colNames && colNames.map(colName => <th nowrap="true" key={colName}>{colName}</th>) }
        </tr>
        </thead>
    )
}

const renderTbody = data => {
    return (
         <tbody>
            {data.map((items,index) => <tr key={index + items[0]}>{items.map((item,index) => renderTd(item, index))}</tr>)}
        </tbody> 
    )
}

const renderTd = (item, index) => {
    return <td nowrap="true" key={index + item}>{item}</td>;
}

const Table = ({ data }) => {
    const headData = data[0] && Object.keys(data[0]);
    const tableData = data.map(item => Object.values(item));
    return (
        <TableWrapper>
        <table>
            {renderThead(headData)}
            {renderTbody(tableData)}
        </table>
        </TableWrapper>
    )
}

export default Table;