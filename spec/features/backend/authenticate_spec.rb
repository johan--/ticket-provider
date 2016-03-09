require 'rails_helper'

feature 'Organizer can login to their account', js: true do
  let(:account) { Fabricate(:account) }
  let(:organizer) { Fabricate(:account_owner, account: account) }

  scenario 'Organizer fill all field', js: true do
    visit new_organizer_session_path
    fill_in 'organizer[email]', with: organizer.email
    fill_in 'organizer[password]', with: organizer.password
    click_button I18n.t('backend.authentication.login')

    expect(page).to have_content('Event')
  end
end

feature 'Organizer can register to their account', js: true do
  let!(:account) { Fabricate.attributes_for(:account) }
  let!(:organizer) { Fabricate.attributes_for(:account_owner) }

  scenario 'Organizer fill all field', js: true do
    visit new_organizer_registration_path
    fill_in 'organizer[email]', with: organizer[:email]
    fill_in 'organizer[name]', with: organizer[:name]
    fill_in 'organizer[account_name]', with: account[:name]
    fill_in 'organizer[password]', with: organizer[:password]
    fill_in 'organizer[password_confirmation]', with: organizer[:password]
    click_button I18n.t('backend.authentication.register')

    expect(page).to have_content('Event')
    expect(Organizer.first.email).to eq organizer[:email]
    expect(Account.first.name).to eq account[:name]
  end

  feature 'Organizer can ask to reset password', js: true do
    let(:account) { Fabricate(:account) }
    let(:organizer) { Fabricate(:account_owner, account: account) }

    scenario 'Organizer fill email', js: true do
      visit new_organizer_password_path
      fill_in 'organizer[email]', with: organizer[:email]
      click_button 'Send me reset password instructions'

      expect(page).to have_content('LOGIN')
    end
  end
end