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
    let(:ticket_type) { Fabricate(:ticket_type, activity: activity) }
    let(:ticket) { Fabricate(:ticket, ticket_type: ticket_type) }

    context 'initial state' do
      subject { ticket.current_state }

      it { is_expected.to eq 'new' }
    end

    context 'transition to sold without user' do
      subject { ticket.transition_to(:sold) }

      it { is_expected.to be_falsey }
    end
  end
end
