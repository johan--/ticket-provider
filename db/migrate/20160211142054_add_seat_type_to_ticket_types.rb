class AddSeatTypeToTicketTypes < ActiveRecord::Migration
  def change
    add_column :ticket_types, :seat_type, :integer
  end
end
