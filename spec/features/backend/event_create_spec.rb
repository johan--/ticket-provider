require 'rails_helper'

feature 'Organizer can create event' do
  let!(:account) { Fabricate(:account) }
  let!(:organizer) { Fabricate(:account_owner, account: account) }
  let!(:event) { Fabricate.attributes_for(:event) }

  before do
    sign_in_with(organizer)
  end

  scenario 'Organizer fill in all required information', js: true do
    visit '/app/events/new'

    within '.event-form-container' do
      fill_in 'name', with: event[:name]
      fill_in 'description', with: event[:description]
    end

    click_button I18n.t('backend.events.create_event')
    wait_for_async_request

    expect(page).to have_content event[:name].upcase
  end

  scenario 'Organizer missed some required information', js: true do
    visit '/app/events/new'

    click_button I18n.t('backend.events.create_event')
    wait_for_async_request

    expect(page).to have_css '.alert.alert-danger'
  end
end