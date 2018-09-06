class TasksController < ApplicationController
  before_action :authorize

  def index
    if params[:project_id]
      begin
        project = current_user.projects.find(params[:project_id])
      rescue ActiveRecord::RecordNotFound
        return render json: { error: "Project not found" }, status: 404
      end

      tasks = project.tasks
    else
      tasks = current_user.tasks
    end

    render json: { tasks: tasks }
  end

  def create
    begin
      project = current_user.projects.find(params[:project_id])
    rescue ActiveRecord::RecordNotFound
      return render json: { error: "Project not found" }, status: 404
    end

    task = project.tasks.create(task_params)

    render json: { task: task }, status: 201
  end

  def update
    begin
      task = Task.joins(:project).where(projects: { owner_id: current_user.id }).find(params[:task_id])
    rescue ActiveRecord::RecordNotFound
      return render json: { error: "Task not found" }, status: 404
    end

    task.update(task_params)
    task.save!

    render json: { task: task }
  end

  def destroy
    begin
      task = current_user.tasks.find(params[:task_id])
    rescue ActiveRecord::RecordNotFound
      return render json: { error: "Task not found" }, status: 404
    end

    task.destroy!

    render json: { task: task }
  end

  private

  def task_params
    params.require(:task).permit(:name, :state, :notes)
  end
end
