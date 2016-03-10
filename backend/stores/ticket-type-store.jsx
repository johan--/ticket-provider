import Backbone from 'backbone';
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
            data: $.param({
              authenticity_token: $('meta[name="csrf-token"]').attr('content'),
              ticket_type: payload.ticket_type
            }),
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
    }
  }
}

export default new TicketTypeCollection();