require 'rails_helper'

feature 'Organizer create ticket type', js: true do
  let!(:account) { Fabricate(:account) }
  let!(:organizer) { Fabricate(:account_owner, account: account) }
  let!(:activity) { Fabricate(:activity, account: account) }
  let!(:ticket_type_1) { Fabricate(:ticket_type, activity: activity) }
  let!(:ticket_type_2) { Fabricate(:ticket_type, activity: activity) }
  let(:ticket_type_params) { Fabricate.attributes_for(:ticket_type) }

  before do
    sign_in_with(organizer)
  end

  scenario 'Organizer edit ticket type', js: true do
    visit "/app/activities/#{activity.uid}/ticket_types"

    within('.ticket-type-form-container') do
      fill_in 'current_price', with: ticket_type_params[:current_price]
      fill_in 'description', with: ticket_type_params[:description]
      click_button('Save Changes')
    end

    wait_for_async_request

    find('.alert')
    expect(page).to have_content I18n.t('backend.ticket_types.success_edit')
  end

  scenario 'Organizer change ticket type', js: true do
    visit "/app/activities/#{activity.uid}/ticket_types"

    wait_for_async_request

    within('.ticket-type-form-container') do
      find('.ticket-types-name').find(:xpath, 'option[2]').select_option
    end

    wait_for_async_request

    expect(find('input[name="current_price"]').value).to eq ticket_type_2[:current_price].to_s
    expect(find('textarea[name="description"]').value).to eq ticket_type_2[:description].to_s
  end
end