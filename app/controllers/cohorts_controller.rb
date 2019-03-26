class CohortsController < ApplicationController
  before_action :set_cohort, only: [:show, :update, :destroy]

  # GET /cohorts
  def index
    @cohorts = Cohort.all

    render json: @cohorts
  end

  # GET /cohorts/1
  def show
    render json: @cohort
  end

  # POST /cohorts
  def create
    @cohort = Cohort.new(cohort_params)

    if @cohort.save
      render json: @cohort, status: :created, location: @cohort
    else
      render json: @cohort.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cohorts/1
  def update
    if @cohort.update(cohort_params)
      render json: @cohort
    else
      render json: @cohort.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cohorts/1
  def destroy
    @cohort.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_cohort
      @cohort = Cohort.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def cohort_params
      params.require(:cohort).permit(:name, :start_date, :end_date, :paid)
    end
end
