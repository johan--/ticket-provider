require 'rails_helper'

feature 'Organizer see particular event', js: true do
  let!(:account) { Fabricate(:account) }
  let!(:organizer) { Fabricate(:account_owner, account: account) }
  let!(:event) { Fabricate(:event, account: account) }

  before do
    sign_in_with(organizer)
  end

  scenario 'Organizer visit existing uid event', js: true do
    visit "/app/events/#{event.uid}"

    expect(page).to have_content event.name.upcase
    expect(page).to have_content event.description
    expect(page).to have_content I18n.t('backend.tickets.edit_ticket')
    expect(page).to have_content I18n.t('backend.tickets.new_ticket')
  end
end