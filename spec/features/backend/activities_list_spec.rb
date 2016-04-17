require 'rails_helper'

feature 'Organizer can retrieve activity belongs to their account', js: true do
  let!(:account) { Fabricate(:account) }
  let(:organizer) { Fabricate(:account_owner, account: account) }

  before do
    Fabricate.times(4, :activity, account: account)
    sign_in_with(organizer)
  end

  scenario 'Organizer has activities in their account', js: true do
    visit '/app/activities'
    wait_for_async_request
    expect(all('.activity-item').size).to eq Activity.count
  end
end