import React, { Component } from 'react';
import Input from '../../../src/components/Input';
import InputSlider from '../../../src/components/InputSlider';
import InputSliderGroup from '../../../src/components/InputSliderGroup';
import VerticalSeparation from '../../../src/components/VerticalSeparation';
import GridList from '../../../src/components/Grid/GridList';

const InputSliderPage = () => {
	return <div>
		<h2>代码演示</h2>
		<VerticalSeparation>
		<GridList cols={6}>
			<Input stype='QUDR'/>
			<Input stype='QUDR' type='INT'/>
			<Input stype='QUDR' type='FLOAT'/>
			<Input stype='LINE'/>
			<Input stype='LINE' type='INT'/>
			<Input stype='LINE' type='FLOAT'/>
		</GridList>
		<InputSlider label='线形浮点数' type='FLOAT' inputStype='LINE'/>
		<InputSlider label='线形整数' type='INT' inputStype='LINE'/>
		<InputSlider label='方形浮点数' type='FLOAT' inputStype='QUDR'/>
		<InputSlider label='方形整数' type='INT' inputStype='QUDR'/>
		<InputSliderGroup title='位移' labels={['x', 'y']} defaults={[0, 0]} min={0} max={1} type='FLOAT' inputStype='LINE'/>
		<InputSliderGroup title='缩放' labels={['x', 'y']} defaults={[0, 0]} min={0} max={1} type='FLOAT' inputStype='QUDR'/>
		</VerticalSeparation>
	</div>;
};

export default InputSliderPage;