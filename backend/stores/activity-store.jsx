import Backbone from '../backbone.jsx';
import Store from './store.jsx';
import constant from '../constants/activity-constants.jsx';
import emitter from '../emitter.jsx';
import $ from 'jquery';

var Activity = Backbone.Model.extend({
  url: function() {
    return `/api/v1/activities/${this.get('id')}` ;
  },

  parse(resp, xhr) {
    if (resp == undefined)
      return {};
    if (resp.activity != undefined)
      return resp.activity;
    return resp;
  }
});

class ActivityCollection extends Store.Collection {
  constructor() {
    super();
    this.model = Activity;
  }

  url() {
    return '/api/v1/activities';
  }

  parse(resp, xhr) {
    return resp.activities;
  }

  getAll(params) {
    this.fetch(params);
    return this;
  }

  getModel(id) {
    let model = new Activity({ id: id });
    this.add(model);
    model.fetch();
    return model;
  }

  handleDispatch(payload) {
    let formData = new FormData();
    switch (payload.actionType) {
      case constant.CREATE_ACTIVITY: {
        // Iterate through activity object and add it to form data.
        $.each(payload.activity, function(key) {
          formData.append(`activity[${key}]`, payload.activity[key]);
        });

        let jqXHR = this
                      .fetch({
                        data: formData,
                        type: 'POST',
                        processData: false,
                        contentType: false
                      });

        jqXHR.done((data) => {
          this.getAll();
          Backbone.history.navigate(`/app/activities/${data.activity.id}`, true);
        });

        jqXHR.fail((jqXHR, textStatus, errorThrown) => {
          emitter.emit('error', jqXHR.responseJSON.errors[0]);
        });
        break;
      }
      case constant.UPDATE_ACTIVITY: {
        let formData = new FormData();

        // Iterate through ACTIVITY object and add it to form data.
        $.each(payload.activity, function (key) {
          formData.append(`activity[${key}]`, payload.activity[key]);
        });

        let jqXHR = this.get(payload.activity.id)
          .fetch({
            data: formData,
            type: 'PUT',
            processData: false,
            contentType: false
          });

        jqXHR.done(() => {
          this.getAll();
          Backbone.history.navigate('/app/activities', true);
        });

        jqXHR.fail((jqXHR, textStatus, errorThrown) => {
          emitter.emit('error', jqXHR.responseJSON.errors[0]);
        });
        break;
      }
      case constant.DELETE_ACTIVITY: {
        let jqXHR = this
                      .get(payload.activity.id)
                      .destroy();

        jqXHR.done(() => {
          this.reset();
          this.getAll();
          emitter.emit('success', I18n.t('backend.activities.success_delete'));
          emitter.emit('hideDeleteModal');
        });

        jqXHR.fail((jqXHR, textStatus, errorThrown) => {
          this.reset();
          this.getAll();
          emitter.emit('errorDeleteActivity', jqXHR.responseJSON.errors[0]);
        });
        break;
      }
    }
  }
}

export default new ActivityCollection();