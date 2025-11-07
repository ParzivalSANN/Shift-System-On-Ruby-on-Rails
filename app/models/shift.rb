class Shift < ApplicationRecord
  validates :start_time, presence: true
  validates :end_time, presence: true
  validates :employee_name, presence: true

  def end_time_after_start_time
    return if end_time.blank? || start_time.blank?

    if end_time < start_time
      errors.add(:end_time, "must be after the start time")
    end
  end
end