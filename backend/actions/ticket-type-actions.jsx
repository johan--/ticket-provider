import dispatch from '../dispatch.jsx';
import constant from '../constants/ticket-type-constants.jsx';

export default {
  add: function(ticket_type) {
    dispatch(constant.CREATE_TICKET_TYPE, { ticket_type: ticket_type });
  },

  edit: function(ticket_type) {
    dispatch(constant.EDIT_TICKET_TYPE, { ticket_type: ticket_type });
  }
};