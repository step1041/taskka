require 'securerandom'

class User < ApplicationRecord
  has_many :projects, foreign_key: 'owner_id'
  has_many :tasks, through: :projects

  before_create :generate_new_access_token, if: -> { !self.access_token }
  after_create :create_default_project

  def serializable_hash(options)
    options[:methods] ||= [
      :default_project_id,
    ]

    options[:except] ||= [
      :google_token,
      :google_id,
    ]

    super
  end

  def generate_new_access_token
    self.access_token = SecureRandom.uuid
  end

  def create_default_project
    self.projects.create(name: 'default')
  end

  def new_user?
    return self.username.nil?
  end

  def provider_connected? (provider)
    case provider
      when "google"
        return self.google_id.present?
      else
        return false
    end
  end

  def default_project
    self.projects.find_by_name('default')
  end

  def default_project_id
    self.default_project.id
  end

  def new_working_day
    self.last_working_day = self.current_working_day
    self.current_working_day = Date.today
    self.save!

    self.tasks.where(:state => "in_progress").update_all(:state => 'new')
  end
end
