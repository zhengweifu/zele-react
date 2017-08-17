import React, { Component } from 'react';
import Highlight from '../../../../src/components/Highlight';
import GridList from '../../../../src/components/Grid/GridList';
import Menu from '../../../../src/components/Menu/Menu';
import SubMenu from '../../../../src/components/Menu/SubMenu';
import MenuItem from '../../../../src/components/Menu/MenuItem';
import MenuItemGroup from '../../../../src/components/Menu/MenuItemGroup';
import SvgIcon from '../../../../src/components/SvgIcon';
import { gImage, gTransform, gBrush } from '../../../../src/svgIcons/google/Image';

const MenuExampleHDark = [
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


const MenuExampleVDark = [
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

const MenuPage = () => {
    return <div>
        <h2>代码演示</h2>
        <div>
            <Menu>
                <MenuItem icon={<SvgIcon><path d={gImage} /></SvgIcon>}/>
                <SubMenu icon={<SvgIcon><path d={gBrush} /></SvgIcon>}  open={true}>
                   <MenuItem />
                   <MenuItemGroup icon={<SvgIcon><path d={gTransform} /></SvgIcon>}>
                       <MenuItem />
                       <MenuItem />  
                    </MenuItemGroup>
                   <MenuItem />  
                </SubMenu>
                <MenuItem />
                <SubMenu>
                   <MenuItem />
                   <MenuItem />  
                </SubMenu>
            </Menu>
            <Highlight className='language-jsx'>{MenuExampleHDark}</Highlight>
        </div>
        <GridList cols={2}>
            <div>
                <Menu mode='vertical'>
                    <MenuItem />
                    <SubMenu open={true}>
                       <MenuItem />
                       <MenuItem />  
                    </SubMenu>
                    <MenuItem icon={<SvgIcon><path d={gImage} /></SvgIcon>}/>
                    <SubMenu open={true}>
                        <MenuItem />
                        <SubMenu open={true}>
                           <MenuItem />
                           <MenuItem />  
                        </SubMenu>
                        <MenuItemGroup icon={<SvgIcon><path d={gTransform} /></SvgIcon>}>
                            <MenuItem />
                            <MenuItem />  
                        </MenuItemGroup>
                      <MenuItem />  
                    </SubMenu>
                </Menu>
                <Highlight className='language-jsx'>{MenuExampleVDark}</Highlight>
            </div>
        </GridList>
        <h2>API</h2>
    </div>
};

export default MenuPage;