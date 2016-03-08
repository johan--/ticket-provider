require 'rails_helper'

feature 'Organizer can update profile' do
  let!(:account) { Fabricate(:account) }
  let!(:organizer) { Fabricate(:account_owner, account: account) }

  before do
    sign_in_with(organizer)
  end

  scenario 'Organizer fill in all required information', js: true do
    visit "/app/organizers"

    fill_in I18n.t('backend.events.name'), with: organizer.name
    fill_in I18n.t('backend.authentication.new_password'), with: '1q2w3e4r'
    fill_in I18n.t('backend.authentication.password_confirmation'), with: '1q2w3e4r'
    fill_in I18n.t('backend.authentication.current_password'), with: organizer.password
    click_button I18n.t('backend.organizers.update')
    wait_for_async_request

    expect(page).to have_content 'LOGIN'
  end

  scenario 'Organizer missed some required information', js: true do
    visit "/app/organizers"

    fill_in I18n.t('backend.events.name'), with: organizer.name
    fill_in I18n.t('backend.authentication.new_password'), with: '1q2w3e4r'
    fill_in I18n.t('backend.authentication.password_confirmation'), with: '1q2w3e4r'
    click_button I18n.t('backend.organizers.update')
    wait_for_async_request

    expect(page).to have_content 'Current password can\'t be blank'
  end
end