import ConfirmModal from '../shared/confirm-modal.jsx';
import EventAction from '../../actions/event-actions.jsx';
import emitter from '../../emitter.jsx';
import _ from 'underscore';

class DeleteModal extends ConfirmModal {

  constructor(props) {
    super(props);

    this.subscription = emitter.addListener('showDeleteModal', this.showDeleteModal.bind(this));
  }

  componentWillUnmount() {
    this.subscription.remove();
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