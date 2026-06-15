class CreateSnippets < ActiveRecord::Migration[8.0]
  def change
    create_table :snippets do |t|
      t.string :category
      t.string :title
      t.text :code

      t.timestamps
    end
  end
end
