import Dispatcher from './dispatcher.jsx';

export default function(actionType, payload) {
  payload = payload || {};
  payload.actionType = actionType;
  return Dispatcher.dispatch(payload);
}

