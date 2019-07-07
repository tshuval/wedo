class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews, id: :uuid do |t|
      t.string :username, null: false
      t.text :description
      t.integer :score, null: false
      t.references :place, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
