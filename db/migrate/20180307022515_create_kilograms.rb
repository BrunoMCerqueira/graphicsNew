class CreateKilograms < ActiveRecord::Migration[5.1]
  def change
    create_table :kilograms do |t|
      t.float :kg
      t.date :kg_date

      t.timestamps
    end
  end
end
