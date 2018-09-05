class Task < ApplicationRecord
  belongs_to :project
  has_many :state_changes, :dependent => :destroy

  validates :name, presence: true
  validates :state, presence: true

  after_create -> do
    self.state_changes.create!(:old_state => nil, :new_state => self.state)
  end

  before_update -> do
    if self.state_changed?
      self.completed_at = self.state == "complete" ? Time.now : nil
      self.state_changes.create!(:old_state => self.state_was, :new_state => self.state)
    end
  end

  def had_state_on?(state, date)
    return self.state_changes.on(date).where(:new_state => state).count != 0
  end
end
