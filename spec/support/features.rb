module Features
  module Async
    def wait_for_async_request
      Timeout.timeout(Capybara.default_max_wait_time) do
        loop until finished_all_async_requests?
      end
    end

    def finished_all_async_requests?
      page.evaluate_script('$.active').zero?
    end
  end

  module SessionHelpers
    def sign_in_with(organizer)
      visit new_organizer_session_path
      fill_in 'organizer[email]', with: organizer.email
      fill_in 'organizer[password]', with: organizer.password
      click_button 'Log in'
      wait_for_async_request
    end
  end
end

RSpec.configure do |config|
  config.include Features::Async, type: :feature
  config.include Features::SessionHelpers, type: :feature
end