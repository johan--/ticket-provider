require 'rails_helper'

feature 'Organizer can delete particular event belongs to their account', js: true do
  let!(:account) { Fabricate(:account) }
  let(:organizer) { Fabricate(:account_owner, account: account) }
  let!(:event) { Fabricate(:event, account: account) }

  before { sign_in_with(organizer) }

  scenario 'Organizer click on .icon-close on particular event', js: true do
    visit '/app/events'
    wait_for_async_request

    find('.event-item .icon-close').click
    expect(page).to have_css('.modal')
    expect(page).to have_content I18n.t('backend.modal.confirm.title.delete_event').upcase
  end

  scenario 'Organizer click confirm on delete modal', js: true do
    visit '/app/events'
    wait_for_async_request

    find('.event-item .icon-close').click
    find('.modal .modal-content .btn-danger').click

    expect(page).to have_content 'Successfully delete event.'
    expect(page).not_to have_css('.event-item')
    expect(page).not_to have_content I18n.t('backend.modal.confirm.title.delete_event').upcase
    expect(Event.count).to eq 0
  end
end