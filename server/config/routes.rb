Rails.application.routes.draw do
  root to: 'home#index'

  post 'auth/:provider/verify', to: 'auth#verify'

  get    'user', to: 'user#view'
  patch  'user', to: 'user#update'

  get    'projects',             to: 'projects#index'
  post   'projects',             to: 'projects#create'
  get    'projects/:project_id', to: 'projects#view'
  patch  'projects/:project_id', to: 'projects#update'
  delete 'projects/:project_id', to: 'projects#destroy'

  get    'projects/:project_id/tasks', to: 'tasks#index'
  post   'projects/:project_id/tasks', to: 'tasks#create'

  get    'tasks',          to: 'tasks#index'
  post   'tasks',          to: 'tasks#create'
  patch  'tasks/:task_id', to: 'tasks#update'
  delete 'tasks/:task_id', to: 'tasks#destroy'
  get    'tasks/scrum',    to: 'tasks#scrum'
end
