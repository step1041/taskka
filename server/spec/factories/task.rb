FactoryBot.define do
  factory :task do
    name { Faker::Company.name }
    project

    trait :with_notes do
      notes { Faker::Lorem.paragraph }
    end
  end
end