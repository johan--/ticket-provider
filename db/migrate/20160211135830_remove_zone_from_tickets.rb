class RemoveZoneFromTickets < ActiveRecord::Migration
  def up
    remove_column :tickets, :zone
  end

  def down
    add_column :tickets, :zone, :string
  end
end
