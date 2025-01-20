class Location < ApplicationRecord
    has_many :work_orders, dependent: :destroy
end
