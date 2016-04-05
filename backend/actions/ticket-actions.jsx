import dispatch from '../dispatch.jsx';
import constant from '../constants/ticket-constants.jsx';

export default {
  add: function(state) {
    dispatch(constant.CREATE_TICKET, { ticket: state.ticket, ticket_type_id: state.ticket_type_id });
  }
};