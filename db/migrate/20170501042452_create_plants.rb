class CreatePlants < ActiveRecord::Migration[5.0]
  def change
    create_table :plants do |t|
      t.string :name
      t.integer :garden_id
      t.decimal :lon
      t.decimal :lat

      t.timestamps
    end
  end
end
