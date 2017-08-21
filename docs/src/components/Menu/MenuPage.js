import React, { Component } from 'react';
import Highlight from '../../../../src/components/Highlight';
import GridList from '../../../../src/components/Grid/GridList';
import Menu from '../../../../src/components/Menu/Menu';
import SubMenu from '../../../../src/components/Menu/SubMenu';
import MenuItem from '../../../../src/components/Menu/MenuItem';
import MenuItemGroup from '../../../../src/components/Menu/MenuItemGroup';

import Icon from '../../../../src/components/Icon';

const MenuExampleHDark = [
    "import React from 'react';",
    "import { Menu, SubMenu, MenuItem, MenuItemGroup, Icon } from 'zele-react';",
    "",
    "const MenuExampleHDark = () => {",
    "    <Menu theme='dark'>",
    "        <MenuItem icon={<Icon type='gImage' />}/>",
    "        <SubMenu icon={<Icon type='gBrush' />}>",
    "           <MenuItem />",
    "           <MenuItemGroup icon={<Icon type='gTransform' />}>",
    "               <MenuItem /> ",
    "            </MenuItemGroup>",
    "           <MenuItem />  ",
    "        </SubMenu>",
    "        <MenuItem />",
    "        <SubMenu>",
    "           <MenuItem />",
    "           <MenuItem />  ",
    "        </SubMenu>",
    "    </Menu>",
    "};",
    "",
    "export default MenuExampleHDark;"
].join('\n');

const MenuExampleHLight = [
    "import React from 'react';",
    "import { Menu, SubMenu, MenuItem, MenuItemGroup, Icon } from 'zele-react';",
    "",
    "const MenuExampleHLight = () => {",
    "   <Menu theme='light'>",
    "       <MenuItem icon={<Icon type='gImage' />}/>",
    "       <SubMenu icon={<Icon type='gBrush' />}>",
    "          <MenuItem />",
    "          <MenuItemGroup icon={<Icon type='gTransform' />}>",
    "              <MenuItem /> ",
    "           </MenuItemGroup>",
    "          <MenuItem />  ",
    "       </SubMenu>",
    "       <MenuItem />",
    "       <SubMenu>",
    "          <MenuItem />",
    "          <MenuItem />  ",
    "       </SubMenu>",
    "   </Menu>",
    "};",
    "",
    "export default MenuExampleHLight;"
].join('\n');


const MenuExampleVDark = [
    "import React from 'react';",
    "import { Menu, SubMenu, MenuItem, MenuItemGroup, Icon } from 'zele-react';",
    "",
    "const MenuExampleVDark = () => {",
    "    <Menu mode='vertical'>",
    "        <MenuItem />",
    "        <SubMenu open={true}>",
    "           <MenuItem />",
    "           <MenuItem />  ",
    "        </SubMenu>",
    "        <MenuItem icon={<Icon type='gImage' />}/>",
    "        <SubMenu open={true}>",
    "            <MenuItem />",
    "            <SubMenu open={true}>",
    "               <MenuItem />",
    "               <MenuItem />  ",
    "            </SubMenu>",
    "            <MenuItemGroup icon={<Icon type='gTransform' />}>",
    "                <MenuItem />",
    "                <MenuItem />  ",
    "            </MenuItemGroup>",
    "          <MenuItem />  ",
    "        </SubMenu>",
    "    </Menu>",
    "};",
    "",
    "export default MenuExampleVDark;"
].join('\n');

const MenuExampleVLight = [
    "import React from 'react';",
    "import { Menu, SubMenu, MenuItem, MenuItemGroup, Icon } from 'zele-react';",
    "",
    "const MenuExampleVLight = () => {",
    "    <Menu mode='vertical' theme='light'>",
    "        <MenuItem />",
    "        <SubMenu open={true}>",
    "           <MenuItem />",
    "           <MenuItem />  ",
    "        </SubMenu>",
    "        <MenuItem icon={<Icon type='gImage' />}/>",
    "        <SubMenu open={true}>",
    "            <MenuItem />",
    "            <SubMenu open={true}>",
    "               <MenuItem />",
    "               <MenuItem />  ",
    "            </SubMenu>",
    "            <MenuItemGroup icon={<Icon type='gTransform' />}>",
    "                <MenuItem />",
    "                <MenuItem />  ",
    "            </MenuItemGroup>",
    "          <MenuItem />  ",
    "        </SubMenu>",
    "    </Menu>",
    "};",
    "",
    "export default MenuExampleVLight;"
].join('\n');

const MenuPage = () => {
    return <div>
        <h2>代码演示</h2>
        <div>
            <Menu theme='dark'>
                <MenuItem icon={<Icon type='gLockOutline' />}/>
                <SubMenu icon={<Icon type='gBrush' />}>
                   <MenuItem />
                   <MenuItemGroup icon={<Icon type='gTransform' />}>
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
        <div>
            <Menu theme='light'>
                <MenuItem icon={<Icon type='gImage' />}/>
                <SubMenu icon={<Icon type='gBrush' />}>
                   <MenuItem />
                   <MenuItemGroup icon={<Icon type='gTransform' />}>
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
            <Highlight className='language-jsx'>{MenuExampleHLight}</Highlight>
        </div>
        <GridList cols={2}>
            <div>
                <Menu mode='vertical'>
                    <MenuItem />
                    <SubMenu open={true}>
                       <MenuItem />
                       <MenuItem />  
                    </SubMenu>
                    <MenuItem icon={<Icon type='gImage' />}/>
                    <SubMenu open={true}>
                        <MenuItem />
                        <SubMenu open={true}>
                           <MenuItem />
                           <MenuItem />  
                        </SubMenu>
                        <MenuItemGroup icon={<Icon type='gTransform' />}>
                            <MenuItem />
                            <MenuItem />  
                        </MenuItemGroup>
                      <MenuItem />  
                    </SubMenu>
                </Menu>
                <Highlight className='language-jsx'>{MenuExampleVDark}</Highlight>
            </div>
            <div>
                <Menu mode='vertical' theme='light'>
                    <MenuItem />
                    <SubMenu open={true}>
                       <MenuItem />
                       <MenuItem />  
                    </SubMenu>
                    <MenuItem icon={<Icon type='gImage' />}/>
                    <SubMenu open={true}>
                        <MenuItem />
                        <SubMenu open={true}>
                           <MenuItem />
                           <MenuItem />  
                        </SubMenu>
                        <MenuItemGroup icon={<Icon type='gTransform' />}>
                            <MenuItem />
                            <MenuItem />  
                        </MenuItemGroup>
                      <MenuItem />  
                    </SubMenu>
                </Menu>
                <Highlight className='language-jsx'>{MenuExampleVLight}</Highlight>
            </div>
        </GridList>
        <h2>API</h2>
    </div>
};

export default MenuPage;