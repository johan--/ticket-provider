import ConfirmModal from '../shared/confirm-modal.jsx';
import ActivityAction from '../../actions/activity-actions.jsx';
import emitter from '../../emitter.jsx';
import _ from 'underscore';

class DeleteModal extends ConfirmModal {

  constructor(props) {
    super(props);
    let t = this.getIntlMessage;
    this.state = {
      title: t('backend.modal.confirm.title.delete_activity'),
      description: t('backend.modal.confirm.description.delete_activity')
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
    ActivityAction.delete(_.pick(this.state.model, 'id'));
  }
}

export default DeleteModal;