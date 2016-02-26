class CreateFavKinds < ActiveRecord::Migration
  def change
    create_table :fav_kinds do |t|
      t.references :user, index: true
      t.references :genre, index: true
      t.integer :counter

      t.timestamps
    end
  end
end
