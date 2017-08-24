import React, { Component } from 'react';
import Highlight from '../../../src/components/Highlight';
import GridList from '../../../src/components/Grid/GridList';
import Grid from '../../../src/components/Grid/Grid';
import Col from '../../../src/components/Grid/Col';
import Label from '../../../src/components/Label';

function createGridCol(widthList, gutter) {
    let result = [], i = 0;
    for(let w of widthList) {
        result.push(<Col key={i} width={w}><div style={{backgroundColor:'#ecf6fd', marginBottom: 5, textAlign: 'center'}}>
            <Label height={30} content={`width = ${w}`}/>
        </div></Col>);

        i ++;
    }

    return <Grid gutter={gutter}>{result}</Grid>
}

function createGridLists(count, gutter) {
    let result = [];
    for(let i = 0; i < count; i ++) {
        result.push(<div key={i} style={{backgroundColor:'#ecf6fd', marginBottom: 5, textAlign: 'center'}}>
            <Label height={30} content={`cols = ${count}`}/>
        </div>);
    }

    return <GridList cols={count} gutter={gutter}>{result}</GridList>
}

export default () => {
    return <div>
        <h2>代码演示</h2>
        <div style={{border: '1px solid #eee', padding: '5px 5px 0 5px', marginBottom: 5}}>
            <h2>Grid + Col</h2>
            {createGridCol([1], 5)}
            {createGridCol([0.5, 0.5], 5)}
            {createGridCol([0.2, 0.5, 0.3], 5)}
            {createGridCol([0.1, 0.2, 0.3, 0.4], 5)}
            {createGridCol([0.2, 0.3, 0.05, 0.2, 0.15, 0.1], 5)}
        </div>
        <div style={{border: '1px solid #eee', padding: '5px 5px 0 5px', marginBottom: 5}}>
            <h2>GridList</h2>
            {createGridLists(1, 5)}
            {createGridLists(2, 5)}
            {createGridLists(3, 5)}
            {createGridLists(4, 5)}
            {createGridLists(5, 5)}
            {createGridLists(6, 5)}
            {createGridLists(7, 5)}
            {createGridLists(8, 5)}
            {createGridLists(9, 5)}
            {createGridLists(10, 5)}
        </div>
    </div>
};
