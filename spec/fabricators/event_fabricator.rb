Fabricator(:event, class_name: 'Event') do
  name { FFaker::Internet.user_name }
  description { FFaker::Lorem.paragraphs.join }
end

Fabricator(:event_with_cover_photo, class_name: 'Event') do
  name { FFaker::Internet.user_name }
  description { FFaker::Lorem.paragraphs.join }
  cover_photo {
    ActionDispatch::Http::UploadedFile.new(
      tempfile: File.new(Rails.root.join('spec/fixtures/assets/example.png')),
      filename: File.basename(File.new(Rails.root.join('spec/fixtures/assets/example.png')))
    )
  }
end