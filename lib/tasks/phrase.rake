namespace :phrase do

  TAGS = %w{backend devise doorkeeper}

  desc 'Setup multiple-file-based localizations'
  task :push do
    push_command = %{ phrase push config/locales/en.yml --tags=default --locale=en --skip-upload-tags --force-update-translations }
    TAGS.each do |tag|
      push_command << %{
        phrase push config/locales/#{tag}.en.yml --tags=#{tag} --locale=en --skip-upload-tags --force-update-translations
      }
    end

    exec push_command
  end

  desc 'Pull localizations'
  task :pull do
    pull_command = %{
      phrase pull --tag=default
      cp phrase/locales/phrase.en.yml config/locales/en.yml
      cp phrase/locales/phrase.th.yml config/locales/th.yml
    }

    TAGS.each do |tag|
      pull_command << %{
        phrase pull --tag=#{tag}
        cp phrase/locales/phrase.en.yml config/locales/#{tag}.en.yml
        cp phrase/locales/phrase.th.yml config/locales/#{tag}.th.yml
      }
    end

    exec pull_command
  end
end