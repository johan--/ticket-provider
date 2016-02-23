require 'rails_helper'

feature 'Organizer can retrieve event belongs to their account' do
  let(:account) { Fabricate(:account) }
  let(:organizer) { Fabricate(:account_owner, account: account) }

  before do
    Fabricate.times(4, :event, account: account)
    sign_in_with(organizer)
  end

  scenario 'Organizer has events in their account', js: true do
    visit '/app/events'

    expect(all('.event-item').size).to eq Event.count
  end
end