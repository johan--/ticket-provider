require 'rails_helper'

RSpec.describe TicketType, type: :model do

  describe 'db' do
    context 'columns' do
      it { should have_db_column(:name).of_type(:string).with_options(null: false) }
    end
  end

  describe 'relationships' do
    it { should belong_to(:event) }
  end
end
