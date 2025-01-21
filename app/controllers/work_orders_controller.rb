class WorkOrdersController < ApplicationController
    def index
      technician = Technician.find(params[:technician_id])
      work_orders = technician.work_orders
      render json: work_orders
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Technician not found" }, status: :not_found
    end
end
