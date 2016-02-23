import Backbone from 'backbone';
import Store from './store.jsx';

var Event = Backbone.Model;

class EventCollection extends Store.Collection {
  constructor() {
    super();
    this.model = Event;
  }

  url() {
    return '/api/v1/events';
  }

  parse(resp, xhr) {
    return resp.events;
  }

  getAll() {
    this.fetch();
    return this;
  }

  handleDispatch(payload) {

  }
}

export default new EventCollection();