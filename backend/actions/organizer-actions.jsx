import dispatch from '../dispatch.jsx';
import constant from '../constants/organizer-constants.jsx';

export default {
  editProfile: function (organizer) {
    dispatch(constant.EDIT_ORGANIZER, {organizer: organizer});
  }
};