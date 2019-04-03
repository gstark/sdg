class AddLatitudeAndLongitudeToStudent < ActiveRecord::Migration[5.2]
  def change
    add_column :students, :latitude, :float
    add_column :students, :longitude, :float
  end
end
