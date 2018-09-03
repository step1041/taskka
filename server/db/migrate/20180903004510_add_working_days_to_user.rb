class AddWorkingDaysToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :current_working_day, :date
    add_column :users, :last_working_day, :date
  end
end
