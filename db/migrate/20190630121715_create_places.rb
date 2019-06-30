class CreatePlaces < ActiveRecord::Migration[5.2]
  def change
    create_table :places do |t|
      t.string :name, null: false
      t.text :description
      t.string :address, null: false
      t.string :website
      t.string :phone
      t.string :email
      t.float :lat
      t.float :lon
      t.float :average_score, default: 0.0
      t.boolean :is_active, default: true

      t.time :sun_open
      t.time :sun_close
      t.time :mon_open
      t.time :mon_close
      t.time :tue_open
      t.time :tue_close
      t.time :wed_open
      t.time :wed_close
      t.time :thu_open
      t.time :thu_close
      t.time :fri_open
      t.time :fri_close
      t.time :sat_open
      t.time :sat_close

      t.timestamps
    end
  end
end
