require 'rails_helper'

feature 'Organizer can delete particular activity belongs to their account', js: true do
  let!(:account) { Fabricate(:account) }
  let(:organizer) { Fabricate(:account_owner, account: account) }
  let!(:activity) { Fabricate(:activity, account: account) }

  before { sign_in_with(organizer) }

  scenario 'Organizer click on .icon-close on particular activity', js: true do
    visit '/app/activities'
    wait_for_async_request

    find('.activity-item .icon-close').click
    expect(page).to have_css('.modal')
    expect(page).to have_content I18n.t('backend.modal.confirm.title.delete_activity').upcase
  end

  scenario 'Organizer click confirm on delete modal', js: true do
    visit '/app/activities'
    wait_for_async_request

    find('.activity-item .icon-close').click
    find('.modal .modal-content .btn-danger').click

    expect(page).to have_content 'Successfully delete activity.'
    expect(page).not_to have_css('.activity-item')
    expect(page).not_to have_content I18n.t('backend.modal.confirm.title.delete_activity').upcase
    expect(Activity.count).to eq 0
  end
end