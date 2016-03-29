import Backbone from './backbone.jsx';

var Router = Backbone.Router.extend({

  routes: {
    'app/activities': 'activities',
    'app/activities/new': 'newActivity',
    'app/activities/(:id)': 'showActivity',
    'app/activities/(:id)/edit': 'editActivity',
    'app/activities/(:id)/ticket_types': 'editTicket',
    'app/organizers/settings': 'organizersSettings',

    // fallback path
    'app': 'activities',
    'app/*path': 'activities'
  },

  activities: function() {
    this.current = 'activities';
  },

  newActivity: function() {
    this.current = 'activities/new';
  },

  showActivity: function(id) {
    this.current = 'activities/show';
    this.params = { _id: id };
  },

  editActivity: function(id) {
    this.current = 'activities/edit';
    this.params = { _id: id };
  },

  editTicket: function(id) {
    this.current = 'events/ticket_types';
    this.params = { _id: id };
  },

  organizersSettings: function() {
    this.current = 'organizers/settings';
  }
});

export default Router;