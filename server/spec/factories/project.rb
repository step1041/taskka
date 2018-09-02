FactoryBot.define do
  factory :project do
    name { Faker::Company.name }
    owner { FactoryBot.create(:user) }
  end
end