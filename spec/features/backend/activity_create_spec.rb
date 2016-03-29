require 'rails_helper'

feature 'Organizer can create activity' do
  let!(:account) { Fabricate(:account) }
  let!(:organizer) { Fabricate(:account_owner, account: account) }
  let!(:activity) { Fabricate.attributes_for(:activity) }

  before do
    sign_in_with(organizer)
  end

  scenario 'Organizer fill in all required information', js: true do
    visit '/app/activities/new'

    within '.activity-form-container' do
      fill_in 'name', with: activity[:name]
      fill_in 'description', with: activity[:description]
    end

    click_button I18n.t('backend.activities.create_activity')
    wait_for_async_request

    expect(page).to have_content activity[:name].upcase
  end

  scenario 'Organizer missed some required information', js: true do
    visit '/app/activities/new'

    click_button I18n.t('backend.activities.create_activity')
    wait_for_async_request

    expect(page).to have_css '.alert.alert-danger'
  end
end