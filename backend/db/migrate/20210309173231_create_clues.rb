class CreateClues < ActiveRecord::Migration[6.1]
  def change
    create_table :clues do |t|
      t.integer :value
      t.string :question
      t.string :answer
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
