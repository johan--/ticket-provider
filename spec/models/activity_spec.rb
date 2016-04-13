require 'rails_helper'

RSpec.describe Activity, type: :model do

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
    let(:activity) { Fabricate.build(:activity, account: account) }

    subject { activity }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:account) }
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
end
