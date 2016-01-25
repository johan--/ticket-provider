# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160125083905) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.string   "name",        null: false
    t.text     "description"
    t.string   "logo"
    t.string   "cover_photo"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "events", force: :cascade do |t|
    t.integer  "account_id"
    t.string   "name",                     null: false
    t.text     "description"
    t.string   "cover_photo"
    t.text     "tags",        default: [],              array: true
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  add_index "events", ["account_id"], name: "index_events_on_account_id", using: :btree

  create_table "organizers", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.integer  "account_id"
    t.string   "name",                                null: false
    t.string   "role",                                null: false
  end

  add_index "organizers", ["account_id"], name: "index_organizers_on_account_id", using: :btree
  add_index "organizers", ["email"], name: "index_organizers_on_email", unique: true, using: :btree
  add_index "organizers", ["reset_password_token"], name: "index_organizers_on_reset_password_token", unique: true, using: :btree

  create_table "ticket_types", force: :cascade do |t|
    t.integer  "event_id"
    t.string   "name",          null: false
    t.text     "description"
    t.decimal  "current_price"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "ticket_types", ["event_id"], name: "index_ticket_types_on_event_id", using: :btree

  create_table "tickets", force: :cascade do |t|
    t.integer  "ticket_type_id"
    t.integer  "user_id"
    t.string   "zone"
    t.string   "row"
    t.string   "column"
    t.decimal  "price"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "tickets", ["ticket_type_id"], name: "index_tickets_on_ticket_type_id", using: :btree
  add_index "tickets", ["user_id"], name: "index_tickets_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "events", "accounts"
  add_foreign_key "organizers", "accounts"
  add_foreign_key "ticket_types", "events"
  add_foreign_key "tickets", "ticket_types"
end
