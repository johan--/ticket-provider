import Backbone from 'backbone';
import Store from './store.jsx';
import constant from '../constants/event-constants.jsx';
import $ from 'jquery';

var Event = Backbone.Model.extend({
  url: function() {
    return '/api/v1/events';
  }
});

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
    switch (payload.actionType) {
      case constant.CREATE_EVENT:
        var jqXHR = this
                      .fetch({
                        data: {
                          "authenticity_token": `${$('meta[name="csrf-token"]').attr('content')}`,
                          "event": payload.event
                        },
                        type: 'POST'
                      });

        jqXHR.done(() => {
          this.getAll();
          Backbone.history.navigate('/app/events', true);
        });
        break;
    }
  }
}

export default new EventCollection();