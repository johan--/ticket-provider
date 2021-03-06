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
    this.fetch();
    return this;
  }

  handleDispatch(payload) {
    switch (payload.actionType) {
      case constant.EDIT_ORGANIZER: {
        let jqXHR = this
          .fetch({
            url: `/api/v1/organizers/${payload.organizer.id}`,
            data: $.param({organizer: payload.organizer}),
            type: 'PUT'
          });

        jqXHR.done(() => {
          emitter.emit('successOrganizer', I18n.t('backend.organizers.success_update'));
        });

        jqXHR.fail((jqXHR, textStatus, errorThrown) => {
          emitter.emit('errorOrganizer', jqXHR.responseJSON.errors[0]);
        });
      }
    }
  }
}

export default new Organizer();