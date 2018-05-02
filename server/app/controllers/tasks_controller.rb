class TasksController < ApplicationController
  before_action :authorize

  def index
    render json: { tasks: current_user.tasks }
  end

  def create
    task_info = params.permit(task: [:name, :state, :notes])['task']

    current_user.tasks.create(task_info)

    render json: { task: current_user.tasks.last }, status: 201
  end

  def view

  end

  def update

  end
end
