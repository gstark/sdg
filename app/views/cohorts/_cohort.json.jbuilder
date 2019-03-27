json.extract! cohort, :id, :name, :start_date, :end_date, :paid, :created_at, :updated_at
json.student_count cohort.students.count
json.url cohort_url(cohort, format: :json)
