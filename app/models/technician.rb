class Technician < ApplicationRecord
    has_many :work_orders, dependent: :destroy
end
