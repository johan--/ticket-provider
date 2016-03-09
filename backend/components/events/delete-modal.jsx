import ConfirmModal from '../shared/confirm-modal.jsx';
import EventAction from '../../actions/event-actions.jsx';
import emitter from '../../emitter.jsx';
import _ from 'underscore';

class DeleteModal extends ConfirmModal {

  constructor(props) {
    super(props);
    let t = this.getIntlMessage;
    this.state = {
      title: t('backend.modal.confirm.title.delete_event'),
      description: t('backend.modal.confirm.description.delete_event')
    };
    this.showModalSubscription = emitter.addListener('showDeleteModal', this.showDeleteModal.bind(this));
    this.hideModelSubscription = emitter.addListener('hideDeleteModal', this.hideModal.bind(this));
  }

  componentWillUnmount() {
    this.showModalSubscription.remove();
    this.hideModelSubscription.remove();
  }

  showDeleteModal(model) {
    this.setState({ title: this.state.title, description: this.state.description, model: model });
    this.$modal.modal('show');
  }

  handleConfirm() {
    EventAction.delete(_.pick(this.state.model, 'id'));
  }
}

export default DeleteModal;