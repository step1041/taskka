class AddCompletedAtToTasks < ActiveRecord::Migration[5.2]
  def up
    add_column :tasks, :completed_at, :datetime

    Task.where(:state => 'complete').each do |task|
      task.completed_at = task.updated_at
      task.save!
    end
  end

  def down
    remove_column :tasks, :completed_at
  end
end
