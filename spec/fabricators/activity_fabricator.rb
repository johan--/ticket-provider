Fabricator(:activity, class_name: 'Activity') do
  name { FFaker::Internet.user_name }
  description { FFaker::Lorem.paragraphs.join }
  date { rand(100).days.ago(Date.current) }
end

Fabricator(:activity_with_cover_photo, class_name: 'Activity') do
  name { FFaker::Internet.user_name }
  description { FFaker::Lorem.paragraphs.join }
  date { rand(100).days.ago(Date.current) }
  cover_photo {
    ActionDispatch::Http::UploadedFile.new(
      tempfile: File.new(Rails.root.join('spec/fixtures/assets/example.png')),
      filename: File.basename(File.new(Rails.root.join('spec/fixtures/assets/example.png')))
    )
  }
end