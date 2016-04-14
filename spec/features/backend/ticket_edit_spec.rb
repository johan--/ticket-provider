require 'rails_helper'

feature 'Organizer edit ticket', js: true do
  let!(:account) { Fabricate(:account) }
  let!(:organizer) { Fabricate(:account_owner, account: account) }
  let!(:activity) { Fabricate(:activity, account: account) }
  let!(:ticket_type) { Fabricate(:ticket_type, activity: activity) }
  let!(:user) { Fabricate(:user) }
  let!(:ticket) { Fabricate(:ticket, ticket_type: ticket_type, user: user) }

  before do
    sign_in_with(organizer)
  end

  scenario 'change ticket type', js: true do
    visit "/app/activities/#{activity.uid}/ticket_types"

    within('.ticket-table') do
      within('.ticket-list') do
        all('.ticket-action').first.click
      end
    end

    within('.update-modal') do
      find('.ticket-types-name').find(:xpath, 'option[2]').select_option
      find('.btn-primary').click
    end

    wait_for_async_request

    expect(page).to have_content 'enter'
  end
end