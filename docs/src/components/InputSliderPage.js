import React, { Component } from 'react';
import Input from '../../../src/components/Input';
import InputSlider from '../../../src/components/InputSlider';
import InputSliderGroup from '../../../src/components/InputSliderGroup';
import VerticalSeparation from '../../../src/components/VerticalSeparation';
import GridList from '../../../src/components/Grid/GridList';

import RaisedButton from '../../../src/components/Button/RaisedButton';

import SimpleItem from '../../../src/components/SimpleItem';

import Select from '../../../src/components/Select';

import ColorPicker from '../../../src/components/ColorPicker';

import MessageBox from '../../../src/components/Modal/MessageBox';

import Label from '../../../src/components/Label';

const InputSliderPage = () => {
	return <div>
		<h2>代码演示</h2>
		<VerticalSeparation>
		<GridList cols={6}>
			<Input stype='QUDR'/>
			<Input stype='QUDR' type='INT' before={<Label height='100%' content='before'/>}/>
			<Input stype='QUDR' type='FLOAT' after={<Label height='100%' content='after'/>}/>
			<Input stype='LINE' before={<Label height='100%' content='length'/>} after={<Label height='100%' content='mm'/>}/>
			<Input stype='LINE' type='INT'/>
			<Input stype='LINE' type='FLOAT'/>
		</GridList>
		<InputSlider label='线形浮点数' type='FLOAT' inputStype='LINE'/>
		<InputSlider label='线形整数' type='INT' inputStype='LINE'/>
		<InputSlider label='方形浮点数' type='FLOAT' inputStype='QUDR'/>
		<InputSlider label='方形整数' type='INT' inputStype='QUDR'/>
		<InputSliderGroup title='位移' labels={['x', 'y']} defaults={[0, 0]} min={0} max={1} type='FLOAT' inputStype='LINE'/>
		<InputSliderGroup title='缩放' labels={['x', 'y']} defaults={[0, 0]} min={0} max={1} type='FLOAT' inputStype='QUDR'/>
		<GridList cols={3} center={true}><RaisedButton type='primary' label='MessageBox.alert' onClick={e => {
			MessageBox.alert('您确定要这么做吗？', '提示', () => {
				alert('提示 "alert"');
			});
		}}/>
		<RaisedButton type='primary' label='MessageBox.confirm' onClick={e => {
			MessageBox.confirm('真的要删除 "ploygon1" 吗？', '确定删除', () => {
				alert('确定 "confirm"');
			});
		}}/>
		<RaisedButton type='primary' label='MessageBox.prompt' onClick={e => {
			MessageBox.prompt('最大值', '14', '输入值', (value) => {
				alert('最大值 ' + value);
			});
		}}/></GridList>

		<GridList cols={8}>
			<SimpleItem title='体育场景测试' imgSrc='../cover.jpg'/>
		</GridList>

		<Select items={[
			'111111', '222222', '333333', '444444', '555555', '666666'
		]}/>

		<Select fullWidth={true} stype='QUDR' items={[
			'111111', '222222', '333333', '444444', '555555', '666666'
		]}/>

		<ColorPicker />
		<ColorPicker value='#ff0' fullWidth={true}/>

		</VerticalSeparation>
	</div>;
};

export default InputSliderPage;