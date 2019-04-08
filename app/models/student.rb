class Student < ApplicationRecord
  belongs_to :cohort

  has_one_attached :photo

  # Adding this line to tell geocoder to turn our `address` column into `latitude` and `longitude`
  geocoded_by :address

  # After running all the validations, attempt to geocode
  after_validation :geocode
end
