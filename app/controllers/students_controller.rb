class StudentsController < ApplicationController
  before_action :set_student, only: [:show, :update, :destroy]

  # GET /students
  def index
    # First load the cohort
    @cohort = Cohort.find(params[:cohort_id])

    # Instead of Student.all, I want the students in this cohort
    @students = @cohort.students

    render json: @students
  end

  # GET /students/1
  def show
    render json: @student
  end

  # POST /students
  def create
    @cohort = Cohort.find(params[:cohort_id])
    @student = @cohort.students.new(student_params)

    if @student.save
      render json: @student, status: :created, location: [@cohort, @student]
    else
      render json: @student.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /students/1
  def update
    if @student.update(student_params)
      render json: @student
    else
      render json: @student.errors, status: :unprocessable_entity
    end
  end

  # DELETE /students/1
  def destroy
    @student.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_student
    # Find the cohort first
    @cohort = Cohort.find(params[:cohort_id])

    @student = @cohort.students.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def student_params
    params.require(:student).permit(:name, :address, :age, :email, :cohort_id)
  end
end
