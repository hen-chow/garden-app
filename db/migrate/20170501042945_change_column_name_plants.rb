class ChangeColumnNamePlants < ActiveRecord::Migration[5.0]
  def change
    remove_column :plants, :lon, :decimal
    add_column :plants, :top, :integer
    remove_column :plants, :lat, :decimal
    add_column :plants, :left, :integer
  end
end
