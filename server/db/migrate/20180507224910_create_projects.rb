class MigrationUser < ActiveRecord::Base
  self.table_name = :users
end

class MigrationProject < ActiveRecord::Base
  self.table_name = :projects
end

class MigrationTask < ActiveRecord::Base
  self.table_name = :tasks
end

class CreateProjects < ActiveRecord::Migration[5.2]
  def up
    create_table :projects do |t|
      t.string :name
      t.bigint :owner_id

      t.timestamps
    end

    add_column :tasks, :project_id, :bigint

    add_foreign_key :projects, :users, column: :owner_id
    add_foreign_key :tasks, :projects

    MigrationUser.all.each do |user|
      project = MigrationProject.create(owner_id: user.id, name: 'default')
      MigrationTask.where(user_id: user.id).update_all(project_id: project.id)
    end

    remove_foreign_key :tasks, :users
    remove_column :tasks, :user_id
  end

  def down
    add_column :tasks, :user_id, :bigint
    add_foreign_key :tasks, :users

    MigrationProject.all.each do |project|
      user_id = MigrationUser.find(project.owner_id)
      MigrationTask.where(project_id: project.id).update_all(user_id: user_id)
    end

    remove_foreign_key :projects, :users
    remove_foreign_key :tasks, :projects

    remove_column :tasks, :project_id

    drop_table :projects
  end
end
