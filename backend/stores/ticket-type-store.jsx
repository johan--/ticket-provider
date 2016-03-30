import Backbone from '../backbone.jsx';
import Store from './store.jsx';
import constant from '../constants/ticket-type-constants.jsx';
import emitter from '../emitter.jsx';
import $ from 'jquery';

var TicketType = Backbone.Model.extend({
  url: function() {
    return `/api/v1/ticket_types/${this.get('id')}` ;
  },

  parse(resp, xhr) {
    if (resp == undefined)
      return {};
    if (resp.ticket_type != undefined)
      return resp.ticket_type;
    return resp;
  }
});

class TicketTypeCollection extends Store.Collection {
  constructor() {
    super();
    this.model = TicketType;
  }

  url() {
    return '/api/v1/ticket_types';
  }

  parse(resp, xhr) {
    return resp.ticket_types;
  }

  getAll(params) {
    this.fetch(params);
    return this;
  }

  getModel(id) {
    let model = new TicketType({ id: id });
    this.add(model);
    model.fetch();
    return model;
  }

  handleDispatch(payload) {
    switch (payload.actionType) {
      case constant.CREATE_TICKET_TYPE: {
        let jqXHR = this
          .fetch({
            data: $.param({ ticket_type: payload.ticket_type }),
            type: 'POST'
          });

        jqXHR.done(() => {
          emitter.emit('hideCreateTicketTypeModal');
        });

        jqXHR.fail((jqXHR, textStatus, errorThrown) => {
          emitter.emit('error', jqXHR.responseJSON.errors[0]);
        });
        break;
      }
      case constant.EDIT_TICKET_TYPE: {
        let formData = new FormData();
        $.each(payload.ticket_type, function (key) {
          formData.append(`ticket_type[${key}]`, payload.ticket_type[key]);
        });
        let jqXHR = this.get(payload.ticket_type.id).fetch({
            data: formData,
            type: 'PUT',
            processData: false,
            contentType: false
          });

        jqXHR.done(() => {
          this.getAll();
          Backbone.history.navigate('/app/activities', true);
        });

        jqXHR.fail((jqXHR, textStatus, errorThrown) => {
          console.log(jqXHR);
          emitter.emit('error', jqXHR.responseJSON.errors[0]);
        });
        break;
      }
    }
  }
}

export default new TicketTypeCollection();