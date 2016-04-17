Fabricator(:access_token, class_name: Doorkeeper::AccessToken) do
  token { SecureRandom.urlsafe_base64 }
end