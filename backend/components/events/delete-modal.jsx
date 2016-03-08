import ConfirmModal from '../shared/confirm-modal.jsx';
import emitter from '../../emitter.jsx';

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
}

export default DeleteModal;