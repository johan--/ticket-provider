import Backbone from 'backbone';

var Router = Backbone.Router.extend({

  routes: {
    'app/events': 'events',

    // fallback path
    'app/*path': 'events'
  },

  events: function() {
    this.current = 'events';
  }
});

export default Router;