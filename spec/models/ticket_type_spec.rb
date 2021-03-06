require 'rails_helper'

RSpec.describe TicketType, type: :model do

  describe 'db' do
    context 'columns' do
      it { should have_db_column(:name).of_type(:string).with_options(null: false) }
    end
  end

  describe 'relationships' do
    it { should belong_to(:activity) }
    it { should have_many(:tickets) }
  end

  describe 'validation' do
    let(:account) { Fabricate(:account) }
    let(:activity) { Fabricate(:activity, account: account) }
    let(:ticket_type) { Fabricate.build(:ticket_type, activity: activity) }

    subject { ticket_type }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:activity) }
  end

  describe '#available_tickets' do
    let!(:account) { Fabricate(:account) }
    let!(:activity) { Fabricate(:activity, account: account) }
    let!(:ticket_type) { Fabricate.build(:ticket_type, activity: activity) }

    before do
      Fabricate.times(3, :ticket, ticket_type: ticket_type)
    end

    subject { activity.available_tickets() }

    it { is_expected.to eq(3) }
  end

  describe '#all_tickets' do
    let!(:account) { Fabricate(:account) }
    let!(:activity) { Fabricate(:activity, account: account) }
    let!(:ticket_type) { Fabricate.build(:ticket_type, activity: activity) }

    before do
      Fabricate.times(3, :ticket, ticket_type: ticket_type)
    end

    subject { activity.all_tickets() }

    it { is_expected.to eq(3) }
  end

  describe '#set_ticket_price' do
    let!(:account) { Fabricate(:account) }
    let!(:activity) { Fabricate(:activity, account: account) }
    let!(:ticket_type) { Fabricate(:ticket_type, activity: activity) }
    let!(:ticket) { Fabricate(:ticket, ticket_type: ticket_type) }

    before do
      ticket_type.current_price = 5
      ticket_type.save
    end

    subject { ticket.reload.price }

    it { is_expected.to eq(5)}
  end
end
