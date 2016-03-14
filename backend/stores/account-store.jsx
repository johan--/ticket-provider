import Backbone from '../backbone.jsx';
import Store from './store.jsx'
import emitter from '../emitter.jsx'
import constant from '../constants/account-constants.jsx';
import $ from 'jquery'

class Account extends Store.Model {
  url() {
    console.log(this);
    return `/api/v1/accounts/${this.get('id')}`;
  }

  parse(resp, xhr) {
    return resp.account;
  }

  getModel() {
    let jqXHR = this.fetch();
    return this;
  }

  handleDispatch(payload) {
    switch (payload.actionType) {
      case constant.EDIT_ACCOUNT: {
        let jqXHR = this
          .fetch({
            url: `/api/v1/accounts/${payload.account.id}`,
            data: $.param({account: payload.account}),
            type: 'PUT'
          });

        jqXHR.done(() => {
          emitter.emit('success', I18n.t('backend.organizers.success_update'));
        });

        jqXHR.fail((jqXHR, textStatus, errorThrown) => {
          emitter.emit('error', jqXHR.responseJSON.errors[0]);
        });
      }
    }
  }
};

export default new Account();