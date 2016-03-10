import Backbone from 'backbone';
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
    switch(payload.actionType) {
      case constant.UPDATE_ACCOUNT: {
        let formData = new FormData();
        // Add CSRF-TOKEN to form data.
        formData.append('authenticity_token', `${$('meta[name="csrf-token"]').attr('content')}`);
        // Iterate through event object and add it to form data.
        $.each(payload.account, function (key) {
          formData.append(`account[${key}]`, payload.account[key]);
        });

        let jqXHR = this
          .fetch({
            url: `/api/v1/accounts/${payload.account.id}`,
            data: formData,
            type: 'PUT',
            processData: false,
            contentType: false
          });

        jqXHR.done(() => {
          window.location.href = '/organizers/sign_in'
        });

        jqXHR.fail((jqXHR, textStatus, errorThrown) => {
          emitter.emit('error', jqXHR.responseJSON.errors[0]);
        });
        break;
      }
    }
  }
}

export default new Account();