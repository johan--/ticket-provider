require 'rails_helper'

RSpec.describe Ticket, type: :model do

  describe 'relationships' do
    it { should belong_to(:user) }
    it { should belong_to(:ticket_type) }
  end

  describe 'validation' do
    let(:account) { Fabricate(:account) }
    let(:activity) { Fabricate(:activity, account: account) }
    let(:ticket_type) { Fabricate(:ticket_type, activity: activity) }
    let(:ticket) { Fabricate.build(:ticket, ticket_type: ticket_type) }

    subject { ticket }

    it { is_expected.to validate_presence_of(:ticket_type) }
  end

  describe 'ticket user validation' do
    let(:account) { Fabricate(:account) }
    let(:activity) { Fabricate(:activity, account: account) }
    let(:ticket_type_1) { Fabricate(:ticket_type, activity: activity) }
    let(:ticket_type_2) { Fabricate(:ticket_type, activity: activity) }
    let(:user) { Fabricate(:user) }
    let!(:ticket_1) { Fabricate(:ticket, ticket_type: ticket_type_1, user: user) }
    let(:ticket_2) { Fabricate.build(:ticket, ticket_type: ticket_type_2, user: user) }

    subject { ticket_2.save }

    it { is_expected.to be_falsey }

    context 'error messages' do
      before { ticket_2.save }

      subject { ticket_2.errors.messages[:user] }

      it { is_expected.to match_array(I18n.t('backend.tickets.ticket_user_error')) }
    end
  end

  describe 'state' do
    let(:account) { Fabricate(:account) }
    let(:activity) { Fabricate(:activity, account: account) }
    let(:ticket_type) { Fabricate(:ticket_type, activity: activity, usage_type: 'countable') }
    let(:ticket) { Fabricate(:ticket, ticket_type: ticket_type) }
    let(:user) { Fabricate(:user) }

    context 'initial state' do
      subject { ticket.current_state }

      it { is_expected.to eq 'new' }
    end

    context 'transition to enable without user' do
      subject { ticket.transition_to(:enter) }

      it { is_expected.to be_falsey }
    end

    context 'transition to enter when usage_quantity is zero' do
      before do
        ticket.update_attributes({ user: user })
        ticket.transition_to(:enter)
        ticket.transition_to(:exit)
        ticket.update_attributes({ usage_quantity: 0 })
      end

      subject { ticket.transition_to(:enter) }

      it { is_expected.to be_falsey }
    end
  end

  describe '#update_price' do
    let!(:account) { Fabricate(:account) }
    let!(:activity) { Fabricate(:activity, account: account) }
    let!(:ticket_type) { Fabricate(:ticket_type, activity: activity) }
    let!(:ticket) { Fabricate(:ticket, ticket_type: ticket_type) }

    subject { ticket.reload.price }

    it { is_expected.to eq(ticket_type.current_price)}
  end
end
