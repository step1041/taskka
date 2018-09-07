class StateChange < ApplicationRecord
  belongs_to :task

  scope :on, -> (date) { where(:created_at => date.midnight..date.end_of_day) }
end
