class Task < ApplicationRecord
  belongs_to :project

  validates :name, presence: true
  validates :state, presence: true

  before_save -> do
    if self.state_changed?
      self.completed_at = self.state == "complete" ? Time.now : nil
    end
  end
end
