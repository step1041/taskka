class TasksController < ApplicationController
  before_action :authorize

  def index
    render json: { tasks: current_user.tasks }
  end

  def view

  end

  def update

  end
end
