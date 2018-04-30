Rails.application.routes.draw do
  post 'auth/:provider/verify', to: 'auth#verify'

  get 'user/current_user'
end
