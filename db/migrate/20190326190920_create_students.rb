class CreateStudents < ActiveRecord::Migration[5.2]
  def change
    create_table :students do |t|
      t.string :name
      t.string :address
      t.integer :age
      t.string :email
      t.belongs_to :cohort, foreign_key: true

      t.timestamps
    end
  end
end
