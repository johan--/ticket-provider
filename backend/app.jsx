import React from 'react';
import ReactDOM from 'react-dom';
import Backbone from 'backbone';
import Router from './router.jsx';
import InterfaceComponent from './components/interface-component.jsx';

I18n.default_locale = "en";
I18n.locale = window.locale;
I18n.fallbacks = true;

// Initialize app router.
let router = new Router();

ReactDOM.render(<InterfaceComponent router={router} />, document.getElementById('app'));

Backbone.history.start({ pushState: true });