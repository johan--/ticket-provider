import Backbone from '../backbone.jsx';
import Store from './store.jsx';
import constant from '../constants/ticket-constants.jsx';
import emitter from '../emitter.jsx';
import $ from 'jquery';

class TicketCollection extends Store.Collection {
  constructor() {
    super();
  }

  url() {
    return '/api/v1/tickets';
  }

  parse(resp, xhr) {
    return resp.tickets;
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
      case constant.CREATE_TICKET: {
        let jqXHR = this
          .fetch({
            data: $.param({ ticket: payload.ticket, ticket_type_id: payload.ticket_type_id}),
            type: 'POST'
          });

        jqXHR.done(() => {
          emitter.emit('updateTable');
          emitter.emit('hideCreateTicketModal');

        });

        jqXHR.fail((jqXHR, textStatus, errorThrown) => {
          emitter.emit('error', jqXHR.responseJSON.errors[0]);
        });
        break;
      }
    }
  }
}

export default new TicketCollection();