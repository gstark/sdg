json.extract! student, :id, :name, :address, :age, :email, :latitude, :longitude, :cohort_id, :created_at, :updated_at
if student.photo.attached?
  json.photo_url url_for(student.photo)
end
