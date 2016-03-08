import dispatch from '../dispatch.jsx';
import constant from '../constants/event-constants.jsx';

export default {
  add: function(event) {
    dispatch(constant.CREATE_EVENT, { event: event });
  },

  edit: function(event) {
    dispatch(constant.UPDATE_EVENT, { event: event });
  },

  delete: function(event) {
    dispatch(constant.DELETE_EVENT, { event: event });
  }
};