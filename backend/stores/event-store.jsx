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
        let formData = new FormData();

        // Add CSRF-TOKEN to form data.
        formData.append('authenticity_token', `${$('meta[name="csrf-token"]').attr('content')}`);

        // Iterate through event object and add it to form data.
        $.each(payload.event, function(key) {
          formData.append(`event[${key}]`, payload.event[key]);
        });

        let jqXHR = this
                      .fetch({
                        data: formData,
                        type: 'POST',
                        processData: false,
                        contentType: false
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