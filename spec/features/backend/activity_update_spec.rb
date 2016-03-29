require 'rails_helper'

feature 'Organizer can update activity' do
  let!(:account) { Fabricate(:account) }
  let!(:organizer) { Fabricate(:account_owner, account: account) }
  let!(:activity) { Fabricate(:activity, account: account) }

  before do
    sign_in_with(organizer)
  end

  scenario 'Organizer fill in all required information', js: true do
    visit "/app/activities/#{activity.uid}/edit"

    within '.activity-form-container' do
      fill_in 'name', with: 'something'
    end

    click_button I18n.t('backend.activities.save_changes')
    wait_for_async_request

    expect(page).to have_content 'something'.capitalize
  end

  scenario 'Organizer missed some required information', js: true do
    visit "/app/activities/#{activity.uid}/edit"

    within '.activity-form-container' do
      fill_in 'name', with: ''
    end

    click_button I18n.t('backend.activities.save_changes')
    wait_for_async_request

    expect(page).to have_css '.alert.alert-danger'
  end
end