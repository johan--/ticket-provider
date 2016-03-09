require 'rails_helper'

RSpec.describe Event, type: :model do

  describe 'db' do
    context 'columns' do
      it { should have_db_column(:name).of_type(:string).with_options(null: false) }
    end
  end

  describe 'relationships' do
    it { should belong_to(:account) }
  end

  describe 'validation' do
    let(:account) { Fabricate(:account) }
    let(:event) { Fabricate.build(:event, account: account) }

    subject { event }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:account) }
  end

  describe 'state' do
    let(:account) { Fabricate(:account) }
    let(:event) { Fabricate.build(:event, account: account) }

    context 'initial state' do
      subject { event.current_state }

      it { is_expected.to eq 'draft' }
    end
  end

  describe '#update' do
    let(:account) { Fabricate(:account) }
    let(:event) { Fabricate(:event, account: account) }

    context 'when event_params and state is valid' do
      subject { event.update({ name: 'valid_name'}, 'publish') }

      it { is_expected.to be_truthy }
    end

    context 'when event_params is invalid' do
      subject { event.update({ name: '' }, 'publish') }

      it { is_expected.to be_falsey }

      context 'errors messages' do
        before { event.update({ name: '' }, 'publish') }

        subject { event.errors.full_messages.to_sentence }

        it { is_expected.to eq 'Name can\'t be blank' }
      end
    end

    context 'when state is invalid' do
      subject { event.update({ name: 'valid_name' }, 'closed') }

      it { is_expected.to be_falsey }

      context 'errors messages' do
        before { event.update({ name: 'valid_name' }, 'closed') }

        subject { event.errors.full_messages.to_sentence }

        it { is_expected.to eq 'State can\'t transition to closed' }
      end
    end

    context 'when both params is invalid' do
      subject { event.update({ name: '' }, 'closed') }

      it { is_expected.to be_falsey }

      context 'errors messages' do
        before { event.update({ name: '' }, 'closed') }

        subject { event.errors.full_messages.to_sentence }

        it { is_expected.to eq 'Name can\'t be blank and State can\'t transition to closed' }
      end
    end
  end
end
