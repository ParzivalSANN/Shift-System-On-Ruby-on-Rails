class CreateShifts < ActiveRecord::Migration[8.1]
  def change
    create_table :shifts do |t|
      t.datetime :start_time
      t.datetime :end_time
      t.string :employee_name

      t.timestamps
    end
  end
end
