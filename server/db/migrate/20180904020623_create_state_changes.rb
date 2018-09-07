class CreateStateChanges < ActiveRecord::Migration[5.2]
  def up
    create_table :state_changes do |t|
      t.bigint :task_id, null: false, index: true
      t.string :old_state, null: true, index: true
      t.string :new_state, null: false, index: true

      t.timestamps
    end

    add_foreign_key :state_changes, :tasks

    Task.all.each do |task|
      task.state_changes.create!(:old_state => nil, :new_state => task.state, :created_at => task.updated_at)
    end
  end

  def down
    remove_foreign_key :state_changes, :tasks
    drop_table :state_changes
  end
end
