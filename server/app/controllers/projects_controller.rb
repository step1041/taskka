class ProjectsController < ApplicationController
  before_action :authorize

  def index
    render json: { projects: current_user.projects }
  end
end
