class AddColToGardens < ActiveRecord::Migration[5.0]
  def change
    add_column  :gardens, :top, :integer
    add_column  :gardens, :left, :integer
  end
end
