json.extract! cohort, :id, :name, :start_date, :end_date, :paid, :created_at, :updated_at
json.student_count cohort.students.count
json.url cohort_url(cohort, format: :json)
# Add a list of the students
# Manually:
#    json.students cohort.students, :name, :address, :age, :email
# Or using the existing json builder for a student
json.students cohort.students, partial: "students/student", as: :student
