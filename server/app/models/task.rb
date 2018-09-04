class Task < ApplicationRecord
  belongs_to :project
  has_many :state_changes, :dependent => :destroy

  validates :name, presence: true
  validates :state, presence: true

  before_save -> do
    if self.state_changed?
      self.completed_at = self.state == "complete" ? Time.now : nil
      self.state_changes.create!(:old_state => self.state_was, :new_state => self.state)
    end
  end
end
