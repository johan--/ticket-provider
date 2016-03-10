require 'rails_helper'

feature 'Organizer create ticket type', js: true do
  let!(:account) { Fabricate(:account) }
  let!(:organizer) { Fabricate(:account_owner, account: account) }
  let!(:event) { Fabricate(:event, account: account) }
  let(:ticket_type_params) { Fabricate.attributes_for(:ticket_type) }

  before do
    sign_in_with(organizer)
  end

  scenario 'Organizer click on New Ticket button', js: true do
    visit "/app/events/#{event.uid}"

    all('.btn.btn-primary').last.click

    expect(page).to have_css('.modal-content')
    expect(page).to have_content I18n.t('backend.ticket_types.headers.add_ticket').upcase
  end

  scenario 'Organizer fill-in a valid information', js: true do
    visit "/app/events/#{event.uid}"

    all('.btn.btn-primary').last.click

    expect(page).to have_css('.modal')

    within('.modal') do
      fill_in 'name', with: ticket_type_params[:name]
      find('.btn-primary').click
    end

    expect(page).not_to have_css('.modal')
    expect(page).not_to have_content I18n.t('backend.ticket_types.headers.add_ticket').upcase
  end

  scenario 'Organizer fill-in an invalid information', js: true do
    visit "/app/events/#{event.uid}"

    all('.btn.btn-primary').last.click

    expect(page).to have_css('.modal')

    within('.modal') do
      find('.btn-primary').click
    end

    expect(page).to have_css('.modal')
    expect(page).to have_content I18n.t('backend.ticket_types.headers.add_ticket').upcase
    expect(page).to have_content 'Name can\'t be blank'
  end
end