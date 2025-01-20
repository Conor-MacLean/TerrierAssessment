class SchedulesController < ApplicationController
  def index
    @technicians = Technician.all
    @work_orders = WorkOrder.includes(:technician, :location).order(:time)
  end

  def work_orders
    technician = Technician.find(params[:id])
    work_orders = technician.work_orders # Assuming a has_many association
    
    render json: work_orders, status: :ok
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Technician not found' }, status: :not_found
  end

end
