class ChangeEventIdToActivityId < ActiveRecord::Migration
  def up
    rename_column :ticket_types, :event_id, :activity_id
  end

  def down
    rename_column :ticket_types, :activity_id, :event_id
  end
end
