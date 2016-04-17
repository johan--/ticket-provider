import dispatch from '../dispatch.jsx';
import constant from '../constants/account-constants.jsx';

export default {
  edit: function (account) {
    dispatch(constant.EDIT_ACCOUNT, {account: account});
  }
};