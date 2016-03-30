class AddAttributesToTickets < ActiveRecord::Migration
  def up
    remove_column :ticket_types, :seat_type
    add_column :ticket_types, :usage_type, :integer, default: 0
    add_column :tickets, :usage_quantity, :integer
  end

  def down
    remove_column :tickets, :usage_quantity
    remove_column :ticket_types, :usage_type
    add_column :ticket_types, :seat_type, :integer
  end
end
