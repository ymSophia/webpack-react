import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.tsx';
// yarn add core-js
// yarn add typescript @types/react-dom @babel/preset-typescript -D

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);