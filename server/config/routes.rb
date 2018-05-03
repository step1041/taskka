Rails.application.routes.draw do
  post 'auth/:provider/verify', to: 'auth#verify'

  get    'user',      to: 'user#view'
  patch  'user',      to: 'user#update'

  get    'tasks',     to: 'tasks#index'
  post   'tasks',     to: 'tasks#create'
  patch  'tasks/:id', to: 'tasks#update'
  delete 'tasks/:id', to: 'tasks#destroy'
end
