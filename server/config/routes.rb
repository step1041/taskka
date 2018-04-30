Rails.application.routes.draw do
  post 'auth/:provider/verify', to: 'auth#verify'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
