import React, { Component } from 'react';
import Highlight from '../../../../src/components/Highlight';
import GridList from '../../../../src/components/Grid/GridList';
import RaisedButton from '../../../../src/components/Button/RaisedButton';

const RaisedButtonExampleSimple = [
    "import React from 'react';",
    "import RaisedButton from '../../../../src/components/RaisedButton';",
    "",
    "const RaisedButtonExampleSimple = () => {",
    "   <div>",
    "        <GridList cols={3}>",
    "            <RaisedButton type='primary' label='Primary' fullWidth={true} disable={true}/>",
    "            <RaisedButton fullWidth={true}/>",
    "            <RaisedButton type='danger' label='Danger' fullWidth={true}/>",
    "        </GridList>",
    "   </div>",
    "};",
    "",
    "export default RaisedButtonExampleSimple;",
].join('\n');


const RaisedButtonExampleSize = [
    "import React from 'react';",
    "import RaisedButton from '../../../../src/components/RaisedButton';",
    "",
    "const RaisedButtonExampleSize = () => {",
    "   <div>",
    "        <GridList cols={4}>",
    "            <RaisedButton type='primary' label='Large' fullWidth={true} size='large'/>",
    "            <RaisedButton type='primary' label='Normal' fullWidth={true}/>",
    "            <RaisedButton type='primary' label='Small' fullWidth={true} size='small'/>",
    "            <RaisedButton type='primary' label='Mini' fullWidth={true} size='mini'/>",
    "        </GridList>",
    "   </div>",
    "};",
    "",
    "export default RaisedButtonExampleSize;",
].join('\n');

const RaisedButtonPage = () => {
    return <div>
        <h2>代码演示</h2>
        <GridList cols={2}>
            <div><GridList cols={3}>
                <RaisedButton type='primary' label='Primary' fullWidth={true} disable={true}/>
                <RaisedButton fullWidth={true}/>
                <RaisedButton type='danger' label='Danger' fullWidth={true}/>
            </GridList>
            <Highlight className='language-jsx'>{RaisedButtonExampleSimple}</Highlight></div>
        
            <div><GridList cols={4}>
                <RaisedButton type='primary' label='Large' fullWidth={true} size='large'/>
                <RaisedButton type='primary' label='Normal' fullWidth={true}/>
                <RaisedButton type='primary' label='Small' fullWidth={true} size='small'/>
                <RaisedButton type='primary' label='Mini' fullWidth={true} size='mini'/>
            </GridList>
            <Highlight className='language-jsx'>{RaisedButtonExampleSize}</Highlight></div>
        </GridList>
        <h2>API</h2>
    </div>
};

export default RaisedButtonPage;