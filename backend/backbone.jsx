import Backbone from 'backbone';
import $ from 'jquery';

Backbone._sync = Backbone.sync;

Backbone.sync = function(method, model, options){
  if (options.data)
    options.data.append('authenticity_token', `${$('meta[name="csrf-token"]').attr('content')}`);
  return Backbone._sync(method, model, options);
};

export default Backbone;