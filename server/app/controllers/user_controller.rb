class UserController < ApplicationController
  before_action :authorize

  def view
    render json: { user: current_user }
  end

  def update
    attributes = params.permit(user: [:username, :last_working_day, :current_working_day])["user"]

    current_user.update_attributes(attributes)
    current_user.save

    render json: { user: current_user }
  end

  def new_day
    current_user.new_working_day

    render json: { user: current_user }
  end

  def scrum
    date = DateTime.parse(params[:date])

    tasks = current_user.scrum_tasks_for(date).map do |task|
      task_json = task.as_json(
        :except => [:state, :completed_at],
        :include => [:project],
      )

      task_json["was_worked_on"] = task.had_state_on?("in_progress", date)
      task_json["was_completed"] = task.had_state_on?("complete", date)

      next task_json
    end

    render json: { tasks: tasks }
  end
end
