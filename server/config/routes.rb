Rails.application.routes.draw do
  post 'auth/:provider/verify', to: 'auth#verify'

  get 'user/current_user'
  patch 'user', to: 'user#update'
end
