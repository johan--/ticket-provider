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
end
