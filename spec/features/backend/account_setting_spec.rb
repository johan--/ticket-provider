require 'rails_helper'

feature 'Organizer can update Account' do
  let!(:account) { Fabricate(:account) }
  let!(:organizer) { Fabricate(:account_owner, account: account) }

  before do
    sign_in_with(organizer)
  end

  scenario 'Organizer fill in all required information', js: true do
    visit "/app/organizers/settings"

    within all('.organizer-settings-container form').last do
      fill_in "account_name", with: "hehe"
      click_button I18n.t('backend.accounts.save_changes')
      wait_for_async_request
    end
    expect(page).to have_content I18n.t('backend.organizers.success_update');
  end

  scenario 'Organizer missed name', js: true do
    visit "/app/organizers/settings"

    within all('.organizer-settings-container form').last do
      fill_in "account_name", with: ''
      click_button I18n.t('backend.accounts.save_changes')
      wait_for_async_request
    end

    expect(page).to have_content 'Name can\'t be blank'
  end
end