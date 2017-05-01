class AddColumnToPlants < ActiveRecord::Migration[5.0]
  def change
    add_column :plants, :img_src, :string
  end
end
