class Task < ApplicationRecord
  belongs_to :project

  validates :name, presence: true
  validates :state, presence: true
end
