import Backbone from 'backbone';
import Store from './store.jsx'
import Emitter from '../emitter.jsx'
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
        let model = new Organizer();
        model.fetch();
        console.log(model.fetch().organizer);
        return model;
    }

    handleDispatch(payload) {
        let formData = new FormData();

        // Add CSRF-TOKEN to form data.
        formData.append('authenticity_token', `${$('meta[name="csrf-token"]').attr('content')}`);

        // Iterate through event object and add it to form data.
        $.each(payload.organizer, function (key) {
            formData.append(`organizer[${key}]`, payload.organizer[key]);
        });
        console.log(payload.organizer);
        let jqXHR = this.get(payload.organizer)
            .fetch({
                data: formData,
                type: 'PUT',
                processData: false,
                contentType: false
            });

        jqXHR.done(() => {
            this.getAll();
            Backbone.history.navigate('/app/organizers', true);
        });

        jqXHR.fail((jqXHR, textStatus, errorThrown) => {
            emitter.emit('error', errorThrown);
        });
    }
};

export default new Organizer();