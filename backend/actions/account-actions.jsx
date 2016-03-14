import dispatch from '../dispatch.jsx';
import constant from '../constants/account-constants.jsx';

export default {
  editAccount: function (account) {
    dispatch(constant.EDIT_ACCOUNT, {account: account});
  }
};