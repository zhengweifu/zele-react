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
    "import Menu from 'zele-react/Menu';",
    "import MenuItem from 'zele-react/MenuItem';",
    "import SubMenu from 'zele-react/SubMenu';",
    "import MenuItemGroup from 'zele-react/MenuItemGroup';",
    "",
    "const MenuExampleHDark = () => {",
    "    <Menu theme='dark'>",
    "        <MenuItem icon={<SvgIcon><path d={gImage} /></SvgIcon>}/>",
    "        <SubMenu icon={<SvgIcon><path d={gBrush} /></SvgIcon>}>",
    "           <MenuItem />",
    "           <MenuItemGroup icon={<SvgIcon><path d={gTransform} /></SvgIcon>}>",
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
    "import Menu from 'zele-react/Menu';",
    "import MenuItem from 'zele-react/MenuItem';",
    "import SubMenu from 'zele-react/SubMenu';",
    "import MenuItemGroup from 'zele-react/MenuItemGroup';",
    "",
    "const MenuExampleHLight = () => {",
    "   <Menu theme='light'>",
    "       <MenuItem icon={<SvgIcon><path d={gImage} /></SvgIcon>}/>",
    "       <SubMenu icon={<SvgIcon><path d={gBrush} /></SvgIcon>}>",
    "          <MenuItem />",
    "          <MenuItemGroup icon={<SvgIcon><path d={gTransform} /></SvgIcon>}>",
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
    "import Menu from 'zele-react/Menu';",
    "import MenuItem from 'zele-react/MenuItem';",
    "import SubMenu from 'zele-react/SubMenu';",
    "import MenuItemGroup from 'zele-react/MenuItemGroup';",
    "",
    "const MenuExampleVDark = () => {",
    "    <Menu mode='vertical'>",
    "        <MenuItem />",
    "        <SubMenu open={true}>",
    "           <MenuItem />",
    "           <MenuItem />  ",
    "        </SubMenu>",
    "        <MenuItem icon={<SvgIcon><path d={gImage} /></SvgIcon>}/>",
    "        <SubMenu open={true}>",
    "            <MenuItem />",
    "            <SubMenu open={true}>",
    "               <MenuItem />",
    "               <MenuItem />  ",
    "            </SubMenu>",
    "            <MenuItemGroup icon={<SvgIcon><path d={gTransform} /></SvgIcon>}>",
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
    "import Menu from 'zele-react/Menu';",
    "import MenuItem from 'zele-react/MenuItem';",
    "import SubMenu from 'zele-react/SubMenu';",
    "import MenuItemGroup from 'zele-react/MenuItemGroup';",
    "",
    "const MenuExampleVLight = () => {",
    "    <Menu mode='vertical' theme='light'>",
    "        <MenuItem />",
    "        <SubMenu open={true}>",
    "           <MenuItem />",
    "           <MenuItem />  ",
    "        </SubMenu>",
    "        <MenuItem icon={<SvgIcon><path d={gImage} /></SvgIcon>}/>",
    "        <SubMenu open={true}>",
    "            <MenuItem />",
    "            <SubMenu open={true}>",
    "               <MenuItem />",
    "               <MenuItem />  ",
    "            </SubMenu>",
    "            <MenuItemGroup icon={<SvgIcon><path d={gTransform} /></SvgIcon>}>",
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
                <MenuItem icon={<SvgIcon><path d={gImage} /></SvgIcon>}/>
                <SubMenu icon={<SvgIcon><path d={gBrush} /></SvgIcon>}>
                   <MenuItem />
                   <MenuItemGroup icon={<SvgIcon><path d={gTransform} /></SvgIcon>}>
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
                <MenuItem icon={<SvgIcon><path d={gImage} /></SvgIcon>}/>
                <SubMenu icon={<SvgIcon><path d={gBrush} /></SvgIcon>}>
                   <MenuItem />
                   <MenuItemGroup icon={<SvgIcon><path d={gTransform} /></SvgIcon>}>
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
            <div>
                <Menu mode='vertical' theme='light'>
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
                <Highlight className='language-jsx'>{MenuExampleVLight}</Highlight>
            </div>
        </GridList>
        <h2>API</h2>
    </div>
};

export default MenuPage;