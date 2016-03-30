class AddApiTokenToActivities < ActiveRecord::Migration
  def change
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
