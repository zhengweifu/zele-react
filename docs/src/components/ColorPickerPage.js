import React, { Component } from 'react';
import VerticalSeparation from '../../../src/components/VerticalSeparation';
import ColorPicker from '../../../src/components/ColorPicker';

const ColorPickerPage = () => {
	return <div>
		<h2>代码演示</h2>
		<VerticalSeparation>
			<ColorPicker />
			<ColorPicker value='#ff0' fullWidth={true}/>
		</VerticalSeparation>
	</div>;
};

export default ColorPickerPage;