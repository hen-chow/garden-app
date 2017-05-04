class AddColumToGardens < ActiveRecord::Migration[5.0]
  def change
    add_column :gardens, :width_height_ratio, :decimal
  end
end
