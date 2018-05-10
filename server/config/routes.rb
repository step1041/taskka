Rails.application.routes.draw do
  root to: 'home#index'

  post 'auth/:provider/verify', to: 'auth#verify'

  get    'user', to: 'user#view'
  patch  'user', to: 'user#update'

  get    'projects',     to: 'projects#index'
  post   'projects',     to: 'projects#create'
  patch  'projects/:id', to: 'projects#update'
  delete 'projects/:id', to: 'projects#destroy'

  get    'tasks',     to: 'tasks#index'
  post   'tasks',     to: 'tasks#create'
  patch  'tasks/:id', to: 'tasks#update'
  delete 'tasks/:id', to: 'tasks#destroy'
end
