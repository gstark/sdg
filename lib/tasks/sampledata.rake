namespace :sampledata do
  desc "Loads our database with sample data"
  task load: :environment do
    # This is where we write our code

    # Delete all the cohorts and then all the users
    Cohort.delete_all
    User.delete_all

    bill = User.create!(name: Faker::Name.name, email: Faker::Internet.email)

    12.times do
      cohort = bill.cohorts.create!(name: Faker::ProgrammingLanguage.name,
                                    start_date: Faker::Date.between(Date.today, 4.months.from_now),
                                    end_date: Faker::Date.between(Date.today, 4.months.from_now),
                                    paid: true)
    end
  end
end
