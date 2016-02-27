import Backbone from 'backbone';

var Router = Backbone.Router.extend({

  routes: {
    'app/events': 'events',
    'app/events/new': 'newEvent',

    // fallback path
    'app/*path': 'events'
  },

  events: function() {
    this.current = 'events';
  },

  newEvent: function() {
    this.current = 'events/new';
  }
});

export default Router;