class CreateTicketTransitions < ActiveRecord::Migration
  def change
    create_table :ticket_transitions do |t|
      t.string :to_state, null: false
      t.text :metadata, default: "{}"
      t.integer :sort_key, null: false
      t.integer :ticket_id, null: false
      t.boolean :most_recent, null: false
      t.timestamps null: false
    end

    add_index(:ticket_transitions,
              [:ticket_id, :sort_key],
              unique: true,
              name: "index_ticket_transitions_parent_sort")
    add_index(:ticket_transitions,
              [:ticket_id, :most_recent],
              unique: true,
              where: 'most_recent',
              name: "index_ticket_transitions_parent_most_recent")
  end
end
