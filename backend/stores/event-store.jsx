import Backbone from 'backbone';
import Store from './store.jsx';
import constant from '../constants/event-constants.jsx';
import emitter from '../emitter.jsx';
import $ from 'jquery';

var Event = Backbone.Model.extend({
  url: function() {
    return `/api/v1/events/${this.get('id')}` ;
  },

  parse(resp, xhr) {
    if (resp.event != undefined)
      return resp.event;
    return resp;
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

  getAll(params) {
    this.fetch(params);
    return this;
  }

  getModel(id) {
    let model = new Event({ id: id });
    this.add(model);
    model.fetch();
    return model;
  }

  handleDispatch(payload) {
    let formData = new FormData();
    switch (payload.actionType) {
      case constant.CREATE_EVENT: {
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

        jqXHR.fail((jqXHR, textStatus, errorThrown) => {
          emitter.emit('error', errorThrown);
        });
        break;
      }
      case constant.UPDATE_EVENT: {
        let formData = new FormData();

        // Add CSRF-TOKEN to form data.
        formData.append('authenticity_token', `${$('meta[name="csrf-token"]').attr('content')}`);

        // Iterate through event object and add it to form data.
        $.each(payload.event, function (key) {
          formData.append(`event[${key}]`, payload.event[key]);
        });

        let jqXHR = this.get(payload.event.id)
          .fetch({
            data: formData,
            type: 'PUT',
            processData: false,
            contentType: false
          });

        jqXHR.done(() => {
          this.getAll();
          Backbone.history.navigate('/app/events', true);
        });

        jqXHR.fail((jqXHR, textStatus, errorThrown) => {
          emitter.emit('error', errorThrown);
        });
        break;
      }
    }
  }
}

export default new EventCollection();