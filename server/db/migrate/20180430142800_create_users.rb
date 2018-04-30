class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username, index: true
      t.string :access_token, index: true, null: false

      t.string :google_id, index: true
      t.string :google_token, index: true

      t.timestamps
    end
  end
end
