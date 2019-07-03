class CreateJoinTablePlacesTags < ActiveRecord::Migration[5.2]
  def change
    create_join_table :places, :tags , column_options: {type: :uuid} do |t|
      t.index [:tag_id, :place_id]
    end
  end
end
