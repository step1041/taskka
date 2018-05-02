class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.bigint :user_id, index: true, null: false
      t.text :notes
      t.string :state, default: 'new', index: true, null: false

      t.timestamps
    end

    add_foreign_key :tasks, :users
  end
end
