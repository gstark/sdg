class CohortsController < ApplicationController
  before_action :set_cohort, only: [:show, :update, :destroy]

  # GET /cohorts
  # GET /cohorts.json
  def index
    @cohorts = Cohort.all
  end

  # GET /cohorts/1
  # GET /cohorts/1.json
  def show
  end

  # POST /cohorts
  # POST /cohorts.json
  def create
    @cohort = Cohort.new(cohort_params)

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
      @cohort = Cohort.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def cohort_params
      params.require(:cohort).permit(:name, :start_date, :end_date, :paid)
    end
end
