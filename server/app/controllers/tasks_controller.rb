class TasksController < ApplicationController
  before_action :authorize

  def index
    render json: { tasks: current_user.tasks }
  end

  def create
    current_user.tasks.create(task_params)
    render json: { task: current_user.tasks.last }, status: 201
  end

  def view

  end

  def update

  end

  private

    def task_params
      params.require(:task).permit(:name, :state, :notes)
    end
end
