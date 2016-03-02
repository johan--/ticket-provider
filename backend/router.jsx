import Backbone from 'backbone';

var Router = Backbone.Router.extend({

  routes: {
    'app/events': 'events',
    'app/events/new': 'newEvent',
    'app/events/(:id)': 'showEvent',
    'app/events/(:id)/edit': 'editEvent',

    // fallback path
    'app/*path': 'events'
  },

  events: function() {
    this.current = 'events';
  },

  newEvent: function() {
    this.current = 'events/new';
  },

  showEvent: function(id) {
    this.current = 'events/show';
    this.params = { _id: id };
  },

  editEvent: function(id) {
    this.current = 'events/edit';
    this.params = { _id: id };
  }
});

export default Router;