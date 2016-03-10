import Backbone from '../backbone.jsx';
import Store from './store.jsx'
import emitter from '../emitter.jsx'
import constant from '../constants/organizer-constants.jsx';
import $ from 'jquery'

class Organizer extends Store.Model {
  url() {
    return '/api/v1/organizers/me';
  }

  parse(resp, xhr) {
    return resp.organizer;
  }

  getModel() {
    let jqXHR = this.fetch();
    return this;
  }

  handleDispatch(payload) {
    switch(payload.actionType) {
      case constant.UPDATE_ORGANIZER: {
        let formData = new FormData();
        // Add CSRF-TOKEN to form data.
        formData.append('authenticity_token', `${$('meta[name="csrf-token"]').attr('content')}`);
        // Iterate through event object and add it to form data.
        $.each(payload.organizer, function (key) {
          formData.append(`organizer[${key}]`, payload.organizer[key]);
        });

        let jqXHR = this
          .fetch({
            url: `/api/v1/organizers/${payload.organizer.id}`,
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
};

export default new Organizer();