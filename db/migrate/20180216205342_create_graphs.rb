class CreateGraphs < ActiveRecord::Migration[5.1]
  def change
    create_table :graphs do |t|
      t.float :kg

      t.timestamps
    end
  end
end
