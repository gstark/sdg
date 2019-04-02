class CohortsController < ApplicationController
  before_action :set_cohort, only: [:show, :update, :destroy]

  # GET /cohorts
  # GET /cohorts.json
  def index
    search = params[:search]

    if search.present?
      @cohorts = current_user.cohorts.where("name ilike ?", "%#{search}%")
    else
      @cohorts = current_user.cohorts
    end
  end

  # GET /cohorts/1
  # GET /cohorts/1.json
  def show
  end

  # POST /cohorts
  # POST /cohorts.json
  def create
    @cohort = current_user.cohorts.new(cohort_params)

    if @cohort.save
      render :show, status: :created, location: @cohort
    else
      render json: @cohort.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cohorts/1
  # PATCH/PUT /cohorts/1.json
  def update
    if @cohort.update(cohort_params)
      render :show, status: :ok, location: @cohort
    else
      render json: @cohort.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cohorts/1
  # DELETE /cohorts/1.json
  def destroy
    @cohort.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_cohort
    @cohort = current_user.cohorts.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def cohort_params
    params.require(:cohort).permit(:name, :start_date, :end_date, :paid)
  end
end
