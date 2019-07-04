class ChangeOpeningHoursToJson < ActiveRecord::Migration[5.2]
  def change
    add_column :places, :opening_hours, :json
    remove_column :places, :sun_open, :string
    remove_column :places, :sun_close, :string
    remove_column :places, :mon_open, :string
    remove_column :places, :mon_close, :string
    remove_column :places, :tue_open, :string
    remove_column :places, :tue_close, :string
    remove_column :places, :wed_open, :string
    remove_column :places, :wed_close, :string
    remove_column :places, :thu_open, :string
    remove_column :places, :thu_close, :string
    remove_column :places, :fri_open, :string
    remove_column :places, :fri_close, :string
    remove_column :places, :sat_open, :string
    remove_column :places, :sat_close, :string
  end
end
