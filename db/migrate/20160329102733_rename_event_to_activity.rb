class RenameEventToActivity < ActiveRecord::Migration
  def up
    rename_table :events, :activities
  end

  def down
    rename_table :activities, :events
  end
end
