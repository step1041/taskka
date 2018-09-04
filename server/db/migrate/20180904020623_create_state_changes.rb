class CreateStateChanges < ActiveRecord::Migration[5.2]
  def change
    create_table :state_changes do |t|
      t.bigint :task_id, null: false, index: true
      t.string :old_state, null: true, index: true
      t.string :new_state, null: false, index: true

      t.timestamps
    end

    add_foreign_key :state_changes, :tasks
  end
end
