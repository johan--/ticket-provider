class MoveApiTokenFromActivitiesToAccounts < ActiveRecord::Migration
  def up
    remove_column :activities, :api_token, :string
    add_column :accounts, :api_token, :string

    # Add api_token to existing account
    Account.all.each do |account|
      begin
        account.api_token = SecureRandom.urlsafe_base64
      end while (account.class.exists?(api_token: account.api_token))
      account.save
    end
  end

  def down
    remove_column :accounts, :api_token, :string
    add_column :activities, :api_token, :string

    # Add api_token to existing activity
    Activity.all.each do |activity|
      begin
        activity.api_token = SecureRandom.urlsafe_base64
      end while (activity.class.exists?(api_token: activity.api_token))
      activity.save
    end
  end
end
