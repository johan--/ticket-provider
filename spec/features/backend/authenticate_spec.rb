require 'rails_helper'

feature 'Organizer can login to their account', js: true do
  let(:account) { Fabricate(:account) }
  let(:organizer) { Fabricate(:account_owner, account: account) }

  scenario 'Organizer fill all field', js: true do
    visit new_organizer_session_path
    p organizer
    fill_in 'organizer[email]', with: organizer.email
    fill_in 'organizer[password]', with: organizer.password
    click_button 'Login'

    expect(page).to have_content('Event')
  end
end

feature 'Organizer can register to their account', js: true do
  let(:account) { Fabricate(:account) }
  let(:organizer) { Fabricate.attributes_for(:account_owner, account: account) }

  scenario 'Organizer fill all field', js: true do
    visit new_organizer_registration_path
    fill_in 'organizer[email]', with: organizer['email']
    fill_in 'organizer[name]', with: organizer['name']
    fill_in 'organizer[password]', with: organizer['password']
    fill_in 'organizer[password_confirmation]', with: organizer['password']
    click_button 'Register'
    wait_for_async_request
    expect(Organizer.last['email']).to eq organizer['email']
  end
end