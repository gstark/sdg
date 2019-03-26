require 'test_helper'

class StudentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @student = students(:one)
  end

  test "should get index" do
    get students_url, as: :json
    assert_response :success
  end

  test "should create student" do
    assert_difference('Student.count') do
      post students_url, params: { student: { address: @student.address, age: @student.age, cohort_id: @student.cohort_id, email: @student.email, name: @student.name } }, as: :json
    end

    assert_response 201
  end

  test "should show student" do
    get student_url(@student), as: :json
    assert_response :success
  end

  test "should update student" do
    patch student_url(@student), params: { student: { address: @student.address, age: @student.age, cohort_id: @student.cohort_id, email: @student.email, name: @student.name } }, as: :json
    assert_response 200
  end

  test "should destroy student" do
    assert_difference('Student.count', -1) do
      delete student_url(@student), as: :json
    end

    assert_response 204
  end
end
