require 'rails_helper'

RSpec.describe Ticket, type: :model do

  describe 'relationships' do
    it { should belong_to(:user) }
    it { should belong_to(:ticket_type) }
  end
end
