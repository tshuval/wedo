# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_07_02_092147) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "places", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.string "address", null: false
    t.string "website"
    t.string "phone"
    t.string "email"
    t.float "lat"
    t.float "lon"
    t.float "average_score", default: 0.0
    t.boolean "is_active", default: true
    t.string "sun_open"
    t.string "sun_close"
    t.string "mon_open"
    t.string "mon_close"
    t.string "tue_open"
    t.string "tue_close"
    t.string "wed_open"
    t.string "wed_close"
    t.string "thu_open"
    t.string "thu_close"
    t.string "fri_open"
    t.string "fri_close"
    t.string "sat_open"
    t.string "sat_close"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "places_tags", id: false, force: :cascade do |t|
    t.bigint "place_id", null: false
    t.bigint "tag_id", null: false
    t.index ["tag_id", "place_id"], name: "index_places_tags_on_tag_id_and_place_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.string "username", null: false
    t.text "description"
    t.integer "score", null: false
    t.bigint "place_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["place_id"], name: "index_reviews_on_place_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name", null: false
    t.string "tag_type", default: "tag", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_tags_on_name"
  end

  add_foreign_key "reviews", "places"
end
