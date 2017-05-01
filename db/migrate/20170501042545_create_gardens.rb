class CreateGardens < ActiveRecord::Migration[5.0]
  def change
    create_table :gardens do |t|
      t.string :name
      t.decimal :lon
      t.decimal :lat
      t.string :img_src
      t.integer :user_id

      t.timestamps
    end
  end
end
