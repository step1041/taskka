Rails.application.routes.draw do
  post 'auth/:provider/verify', to: 'auth#verify'

  get 'user', to: 'user#view'
  patch 'user', to: 'user#update'

  get 'tasks', to: 'tasks#index'
  put 'tasks', to: 'tasks#create'
  get 'tasks/:id', to: 'tasks#view'
  patch 'tasks/:id', to: 'tasks#update'
end
