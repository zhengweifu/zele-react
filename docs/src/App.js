import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter, Route, Link } from 'react-router-dom';

import IndexPage from './components/IndexPage';
import RaisedButtonPage from './components/Button/RaisedButtonPage';
import InputSliderPage from './components/InputSliderPage';
import ColorPickerPage from './components/ColorPickerPage';
import MenuPage from './components/Menu/MenuPage';
import GridPage from './components/GridPage';

let App = (props) => {
	return <div>
		<Route exact path='/' component={IndexPage} />
		<Route exact path='/RaisedButton' component={RaisedButtonPage} />
		<Route exact path='/InputSlider' component={InputSliderPage} />
		<Route exact path='/ColorPicker' component={ColorPickerPage} />
		<Route exact path='/Menu' component={MenuPage} />
		<Route exact path='/Grid' component={GridPage} />
	</div>
}

ReactDOM.render(<HashRouter>
	<App />
</HashRouter>, document.getElementById('app'));