require 'rails_helper'

feature 'Organizer can update event' do
  let!(:account) { Fabricate(:account) }
  let!(:organizer) { Fabricate(:account_owner, account: account) }
  let!(:event) { Fabricate(:event, account: account) }

  before do
    sign_in_with(organizer)
  end

  scenario 'Organizer fill in all required information', js: true do
    visit "/app/events/#{event.uid}/edit"

    within '.event-form-container' do
      fill_in 'name', with: 'something'
    end

    click_button I18n.t('backend.events.save_changes')
    wait_for_async_request

    expect(page).to have_content 'something'.capitalize
  end

  scenario 'Organizer missed some required information', js: true do
    visit "/app/events/#{event.uid}/edit"

    within '.event-form-container' do
      fill_in 'name', with: ''
    end

    click_button I18n.t('backend.events.save_changes')
    wait_for_async_request

    expect(page).to have_css '.alert.alert-danger'
  end
end