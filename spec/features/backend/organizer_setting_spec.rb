require 'rails_helper'

feature 'Organizer can update profile' do
  let!(:account) { Fabricate(:account) }
  let!(:organizer) { Fabricate(:account_owner, account: account) }

  before do
    sign_in_with(organizer)
  end

  scenario 'Organizer fill in all required information', js: true do
    visit "/app/organizers/settings"

    fill_in "organizer_name", with: organizer.name
    fill_in "password", with: '1q2w3e4r'
    fill_in "password_confirmation", with: '1q2w3e4r'
    fill_in "current_password", with: organizer.password
    click_button I18n.t('backend.organizers.save_changes')
    wait_for_async_request

    expect(page).to have_content I18n.t('backend.organizers.success_update');
  end

  scenario 'Organizer missed some required information', js: true do
    visit "/app/organizers/settings"

    fill_in "organizer_name", with: organizer.name
    fill_in "password", with: '1q2w3e4r'
    fill_in "password_confirmation", with: '1q2w3e4r'
    click_button I18n.t('backend.organizers.save_changes')
    wait_for_async_request

    expect(page).to have_content 'Current password can\'t be blank'
  end
end