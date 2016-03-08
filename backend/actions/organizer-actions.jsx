import dispatch from '../dispatch.jsx';
import constant from '../constants/organizer-constants.jsx';

export default {
  edit: function (organizer) {
    dispatch(constant.UPDATE_ORGANIZER, {organizer: organizer});
  }
};