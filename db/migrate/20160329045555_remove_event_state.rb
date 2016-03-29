class RemoveEventState < ActiveRecord::Migration
  def up
    drop_table :event_transitions
  end

  def down
    create_table :event_transitions do |t|
      t.string :to_state, null: false
      t.text :metadata, default: "{}"
      t.integer :sort_key, null: false
      t.integer :event_id, null: false
      t.boolean :most_recent, null: false
      t.timestamps null: false
    end

    add_index(:event_transitions,
              [:event_id, :sort_key],
              unique: true,
              name: "index_event_transitions_parent_sort")
    add_index(:event_transitions,
              [:event_id, :most_recent],
              unique: true,
              where: 'most_recent',
              name: "index_event_transitions_parent_most_recent")
  end
end
