import dispatch from '../dispatch.jsx';
import constant from '../constants/event-constants.jsx';

export default {
  add: function(event) {
    dispatch(constant.CREATE_EVENT, { event: event });
  }
};