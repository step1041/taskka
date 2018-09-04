class StateChange < ApplicationRecord
  belongs_to :task

  scope :on, -> (day) { where("DATE(state_changes.created_at) = ?", day) }
end
