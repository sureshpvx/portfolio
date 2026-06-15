class CreateProfiles < ActiveRecord::Migration[8.0]
  def change
    create_table :profiles do |t|
      t.string :name
      t.string :role
      t.string :location
      t.string :email
      t.string :availability
      t.string :phone
      t.string :github
      t.string :linkedin

      t.timestamps
    end
  end
end
