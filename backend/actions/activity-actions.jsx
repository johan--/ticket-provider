import dispatch from '../dispatch.jsx';
import constant from '../constants/activity-constants.jsx';

export default {
  add: function(activity) {
    dispatch(constant.CREATE_ACTIVITY, { activity: activity });
  },

  edit: function(activity) {
    dispatch(constant.UPDATE_ACTIVITY, { activity: activity });
  },

  delete: function(activity) {
    dispatch(constant.DELETE_ACTIVITY, { activity: activity });
  }
};