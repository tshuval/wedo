class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.string :username, null: false
      t.text :description
      t.integer :score, null: false
      t.references :place, foreign_key: true

      t.timestamps
    end
  end
end
