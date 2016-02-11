class RemoveZoneFromTickets < ActiveRecord::Migration
  def change
    remove_column :tickets, :zone, :string
  end
end
