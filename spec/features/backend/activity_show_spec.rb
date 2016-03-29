require 'rails_helper'

feature 'Organizer see particular activity', js: true do
  let!(:account) { Fabricate(:account) }
  let!(:organizer) { Fabricate(:account_owner, account: account) }
  let!(:activity) { Fabricate(:activity, account: account) }

  before do
    sign_in_with(organizer)
  end

  scenario 'Organizer visit existing uid activity', js: true do
    visit "/app/activities/#{activity.uid}"

    expect(page).to have_content activity.name.upcase
    expect(page).to have_content activity.description
    expect(page).to have_content I18n.t('backend.tickets.edit_ticket')
    expect(page).to have_content I18n.t('backend.tickets.new_ticket')
  end
end