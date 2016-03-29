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
      subject { ticket.transition_to(:enable) }

      it { is_expected.to be_falsey }
    end

    context 'transition to disable when usage_quantity change to zero' do
      before do
        ticket.update_attributes({ user: user })
        ticket.transition_to(:enable)
        ticket.update_attributes({ usage_quantity: 0 })
      end

      subject { ticket.reload.current_state }

      it { is_expected.to eq 'disable' }
    end
  end
end
