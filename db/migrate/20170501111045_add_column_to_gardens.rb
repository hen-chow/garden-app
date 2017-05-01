class AddColumnToGardens < ActiveRecord::Migration[5.0]
  def change
    add_column :gardens, :length, :integer
    add_column :gardens, :width, :integer
  end
end
