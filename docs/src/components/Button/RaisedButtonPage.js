import React, { Component } from 'react';
import Highlight from '../../../../src/components/Highlight';
import GridList from '../../../../src/components/Grid/GridList';
import RaisedButton from '../../../../src/components/Button/RaisedButton';
import ButtonGroup from '../../../../src/components/Button/ButtonGroup';
import Icon from '../../../../src/components/Icon';

const RaisedButtonExampleSimple = [
    "import React from 'react';",
    "import { GridList, RaisedButton } from 'zele-react';",
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
    "import { GridList, RaisedButton } from 'zele-react';",
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

const RaisedButtonExampleIcon = [
    "import React from 'react';",
    "import { GridList, RaisedButton, Icon } from 'zele-react';",
    "",
    "const RaisedButtonExampleIcon = () => {",
    "   <div>",
    "        <GridList cols={4}>",
    "            <RaisedButton type='primary' fullWidth={true} label='LeftIcon' leftIcon={<Icon type='gImage' />}/>",
    "            <RaisedButton type='primary' disabled={true} fullWidth={true} label='LeftIcon' leftIcon={<Icon type='gImage' />}/>",
    "            <RaisedButton type='primary' fullWidth={true} label='RightIcon' rightIcon={<Icon type='gKeyboardArrowRight' />}/>",
    "            <RaisedButton type='primary' disabled={true} fullWidth={true} label='RightIcon' rightIcon={<Icon type='gKeyboardArrowRight' />}/>",
    "        </GridList>",
    "   </div>",
    "};",
    "",
    "export default RaisedButtonExampleIcon;",
].join('\n');

const RaisedButtonExampleGroup = [
    "import React from 'react';",
    "import { GridList, RaisedButton, Icon } from 'zele-react';",
    "",
    "const RaisedButtonExampleGroup = () => {",
    "   <div>",
    "        <GridList cols={3} center={true}>",
    "            <ButtonGroup>",
    "                <RaisedButton label='left' fullWidth={true} leftIcon={<Icon type='gKeyboardArrowLeft'/>}/>",
    "                <RaisedButton label='center' fullWidth={true}/>",
    "                <RaisedButton label='right' fullWidth={true} rightIcon={<Icon type='gKeyboardArrowRight' />}/>",
    "            </ButtonGroup>",
    "            <ButtonGroup>",
    "                <RaisedButton type='primary' label='left' fullWidth={true} leftIcon={<Icon type='gKeyboardArrowLeft'/>}/>",
    "                <RaisedButton type='primary' label='center1' fullWidth={true}/>",
    "                <RaisedButton type='primary' label='center2' fullWidth={true}/>",
    "                <RaisedButton type='primary' label='right' fullWidth={true} rightIcon={<Icon type='gKeyboardArrowRight' />}/>",
    "            </ButtonGroup>",
    "            <ButtonGroup>",
    "                <RaisedButton type='danger' label='left' fullWidth={true} leftIcon={<Icon type='gKeyboardArrowLeft'/>}/>",
    "                <RaisedButton type='danger' label='right' fullWidth={true} rightIcon={<Icon type='gKeyboardArrowRight' />}/>",
    "            </ButtonGroup>",
    "        </GridList>",
    "   </div>",
    "};",
    "",
    "export default RaisedButtonExampleGroup;",
].join('\n');

const RaisedButtonPage = () => {
    return <div>
        <h2>代码演示</h2>
        <GridList cols={2}>
            <div><GridList cols={4}>
                <RaisedButton type='primary' label='Primary' fullWidth={true} disable={true}/>
                <RaisedButton fullWidth={true}/>
                <RaisedButton type='danger' label='Danger' fullWidth={true}/>
                <RaisedButton type='danger' label='Disabled' fullWidth={true} disabled={true}/>
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
        <GridList cols={2}>
            <div><GridList cols={4}>
                <RaisedButton type='primary' fullWidth={true} label='LeftIcon' leftIcon={<Icon type='gImage' />}/>
                <RaisedButton type='primary' disabled={true} fullWidth={true} label='LeftIcon' leftIcon={<Icon type='gImage' />}/>
                <RaisedButton type='primary' fullWidth={true} label='RightIcon' rightIcon={<Icon type='gKeyboardArrowRight' />}/>
                <RaisedButton type='primary' disabled={true} fullWidth={true} label='RightIcon' rightIcon={<Icon type='gKeyboardArrowRight' />}/>
            </GridList>
            <Highlight className='language-jsx'>{RaisedButtonExampleIcon}</Highlight></div>
            <div><GridList cols={4}>
                <RaisedButton type='primary' label='Large' fullWidth={true} size='large' leftIcon={<Icon type='gKeyboardArrowLeft' />}/>
                <RaisedButton type='primary' label='Normal' fullWidth={true} rightIcon={<Icon type='gKeyboardArrowRight' />}/>
                <RaisedButton type='primary' label='Small' fullWidth={true} size='small' leftIcon={<Icon type='gKeyboardArrowLeft' />}/>
                <RaisedButton type='primary' label='Mini' fullWidth={true} size='mini' rightIcon={<Icon type='gKeyboardArrowRight' />}/>
            </GridList>
            <Highlight className='language-jsx'>{RaisedButtonExampleSize}</Highlight></div>
        </GridList>
        <div><GridList cols={3} center={true}>
            <ButtonGroup>
                <RaisedButton label='left' fullWidth={true} leftIcon={<Icon type='gKeyboardArrowLeft'/>}/>
                <RaisedButton label='center' fullWidth={true}/>
                <RaisedButton label='right' fullWidth={true} rightIcon={<Icon type='gKeyboardArrowRight' />}/>
            </ButtonGroup>
            <ButtonGroup>
                <RaisedButton type='primary' label='left' fullWidth={true} leftIcon={<Icon type='gKeyboardArrowLeft'/>}/>
                <RaisedButton type='primary' label='center1' fullWidth={true}/>
                <RaisedButton type='primary' label='center2' fullWidth={true}/>
                <RaisedButton type='primary' label='right' fullWidth={true} rightIcon={<Icon type='gKeyboardArrowRight' />}/>
            </ButtonGroup>
            <ButtonGroup>
                <RaisedButton type='danger' label='left' fullWidth={true} leftIcon={<Icon type='gKeyboardArrowLeft'/>}/>
                <RaisedButton type='danger' label='right' fullWidth={true} rightIcon={<Icon type='gKeyboardArrowRight' />}/>
            </ButtonGroup>
        </GridList>
        <Highlight className='language-jsx'>{RaisedButtonExampleGroup}</Highlight></div>
    </div>
};

export default RaisedButtonPage;