require 'rails_helper'

feature 'Organizer new ticket to ticket type', js: true do
  let!(:account) { Fabricate(:account) }
  let!(:organizer) { Fabricate(:account_owner, account: account) }
  let!(:activity) { Fabricate(:activity, account: account) }
  let!(:ticket_type) { Fabricate(:ticket_type, activity: activity) }

  before do
    sign_in_with(organizer)
  end

  scenario 'Organizer click on add Ticket button', js: true do
    visit "/app/activities/#{activity.uid}/ticket_types"

    within('.ticket-types-container') do
      all('.btn-primary').last.click
    end

    expect(page).to have_css('.modal.in')
    expect(page).to have_content I18n.t('backend.ticket_types.headers.add_ticket').upcase
  end

  scenario 'Organizer fill-in ticket quantity', js: true do
    visit "/app/activities/#{activity.uid}/ticket_types"

    within('.ticket-types-container') do
      all('.btn-primary').last.click
    end

    within('.modal.in') do
      fill_in 'ticket_quantity', with: 5
      find('.btn-primary').click
    end

    expect(page).not_to have_css('.modal.in')
    expect(page).to have_css('.ticket-list', :count => 5)
    expect(page).not_to have_content I18n.t('backend.ticket_types.headers.add_ticket').upcase
  end
end