require 'rails_helper'

feature 'Organizer can update their account' do
  let!(:account) { Fabricate(:account) }
  let!(:organizer) { Fabricate(:account_owner, account: account) }

  before do
    sign_in_with(organizer)
  end

  scenario 'Organizer fill in all required information', js: true do
    visit "/app/organizers/settings"

    within all('.organizer-settings-container form').last do
      fill_in "name", with: "hehe"
      click_button I18n.t('backend.accounts.save_changes')
      wait_for_async_request

      expect(page).to have_content I18n.t('backend.organizers.success_update')
    end
  end

  scenario 'Organizer missed some required information', js: true do
    visit "/app/organizers/settings"

    within all('.organizer-settings-container form').last do
      fill_in "name", with: ''
      click_button I18n.t('backend.accounts.save_changes')
      wait_for_async_request

      expect(page).to have_content 'Name can\'t be blank'
    end
  end
end