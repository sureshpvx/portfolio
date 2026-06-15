class CreateTimelineEvents < ActiveRecord::Migration[8.0]
  def change
    create_table :timeline_events do |t|
      t.string :status
      t.string :company
      t.string :duration
      t.string :title
      t.text :description
      t.text :detail

      t.timestamps
    end
  end
end
