class ChangeOpeningHoursTypeInPlaces < ActiveRecord::Migration[5.2]
  def change
    change_column :places, :sun_open, :string
    change_column :places, :sun_close, :string
    change_column :places, :mon_open, :string
    change_column :places, :mon_close, :string
    change_column :places, :tue_open, :string
    change_column :places, :tue_close, :string
    change_column :places, :wed_open, :string
    change_column :places, :wed_close, :string
    change_column :places, :thu_open, :string
    change_column :places, :thu_close, :string
    change_column :places, :fri_open, :string
    change_column :places, :fri_close, :string
    change_column :places, :sat_open, :string
    change_column :places, :sat_close, :string
  end
end
