# God
Fabricate(:god)

# Account
account = Fabricate(:account, name: 'ZAAP')
accounts = [ account, Fabricate(:account) ]

# Organizer
Fabricate(:account_owner, account: account)
Fabricate(:team_member, account: account)

# Activity
activities = Fabricate.times(4, :activity_with_cover_photo) do
  account accounts.sample
end

# Ticket Type
ticket_types = Fabricate.times(5, :ticket_type) do
  activity activities.sample
end

# User
users = Fabricate.times(50, :user)
users << nil

# Ticket
users.each do |user|
  Fabricate(:ticket) do
    user user
    ticket_type ticket_types.sample
  end
end