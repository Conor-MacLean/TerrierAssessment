class SchedulesController < ApplicationController
  def index
    @technicians = Technician.all
    @work_orders = WorkOrder.includes(:technician, :location).order(:time)
  end
end
