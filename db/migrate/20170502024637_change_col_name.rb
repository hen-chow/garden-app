class ChangeColName < ActiveRecord::Migration[5.0]
  def change
    add_column :gardens, :height, :integer
    remove_column :gardens, :length, :integer
  end
end
