import Backbone from 'backbone';
import Dispatcher from '../dispatcher.jsx';

var baseStore = {
  /**
   * Backbone initialize method
   */
  initialize: function() {
    Dispatcher.register(this.handleDispatch.bind(this));
  },

  /**
   * Handle dispatcher action
   * @param {Object} payload
   */
  handleDispatch: function() {}
};

export default {
  Model: Backbone.Model.extend(baseStore),
  Collection: Backbone.Collection.extend(baseStore)
};
