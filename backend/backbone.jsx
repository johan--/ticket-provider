import Backbone from 'backbone';
import $ from 'jquery';

Backbone._sync = Backbone.sync;

Backbone.sync = function(method, model, options){
  options.beforeSend = function(xhr) {
    xhr.setRequestHeader('X-CSRF-Token', `${$('meta[name="csrf-token"]').attr('content')}`);
  };
  return Backbone._sync(method, model, options);
};

export default Backbone;