import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter, Route, Link } from 'react-router-dom';

import IndexPage from './components/IndexPage';
import RaisedButtonPage from './components/Button/RaisedButtonPage';
import MenuPage from './components/Menu/MenuPage';

let App = (props) => {
	return <div>
		<Route exact path='/' component={IndexPage} />
		<Route exact path='/RaisedButton' component={RaisedButtonPage} />
		<Route exact path='/Menu' component={MenuPage} />
	</div>
}

ReactDOM.render(<HashRouter>
	<App />
</HashRouter>, document.getElementById('app'));