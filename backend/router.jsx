import Backbone from 'backbone';

var Router = Backbone.Router.extend({

  routes: {
    'app/events': 'events',

    // fallback path
    'app/*path': 'events'
  },

  events: function() {
    console.log('events');
    this.current = 'events';
  }
});

export default Router;