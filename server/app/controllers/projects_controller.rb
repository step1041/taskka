class ProjectsController < ApplicationController
  before_action :authorize

  def index
    render json: { projects: current_user.projects }
  end

  def create
    project = current_user.projects.create(project_params)
    render json: { project: project }, status: 201
  end

  def update
    begin
      project = current_user.projects.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      return render json: { error: "Project not found" }, status: 404
    end

    project.update(project_params)
    project.save!

    render json: { project: project }
  end

  def destroy
    begin
      project = current_user.project.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      return render json: { error: "Project not found" }, status: 404
    end

    project.destroy!

    render json: { project: project }
  end

  private

    def project_params
      params.require(:project).permit(:name)
    end
end
