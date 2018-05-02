class TasksController < ApplicationController
  before_action :authorize

  def index
    user = request.env["current_user"]
    render json: { tasks: user.tasks }
  end

  def view

  end

  def update

  end
end
