FactoryBot.define do
  factory :user do
    username { Faker::Myst.character }
  end
end