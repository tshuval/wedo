class CreateTags < ActiveRecord::Migration[5.2]
  def change
    create_table :tags do |t|
      t.string :name, null: false
      t.string :type, null: false, default: 'tag'

      t.timestamps
    end
    add_index :tags, :name
  end
end
