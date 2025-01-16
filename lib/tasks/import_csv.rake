namespace :import do
    desc "Import technicians, locations, and work orders from CSV files"
  
    task all: :environment do
      Rake::Task["import:technicians"].invoke
      Rake::Task["import:locations"].invoke
      Rake::Task["import:work_orders"].invoke
    end
  
    desc "Import technicians from CSV"
    task technicians: :environment do
      require 'csv'
      file_path = Rails.root.join('db', 'csv', 'technicians.csv')
  
      CSV.foreach(file_path, headers: true) do |row|
        Technician.find_or_create_by(name: row['name'])
      end
      puts "Technicians imported successfully."
    end
  
    desc "Import locations from CSV"
    task locations: :environment do
      require 'csv'
      file_path = Rails.root.join('db', 'csv', 'locations.csv')
  
      CSV.foreach(file_path, headers: true) do |row|
        Location.find_or_create_by(
          name: row['name'],
          city: row['city']
        )
      end
      puts "Locations imported successfully."
    end
  
    desc "Import work orders from CSV"
    task work_orders: :environment do
      require 'csv'
      file_path = Rails.root.join('db', 'csv', 'work_orders.csv')
  
      CSV.foreach(file_path, headers: true) do |row|
        technician = Technician.find_or_create_by(name: row['technician_name'])
        location = Location.find_or_create_by(name: row['location_name'], city: row['city'])
  
        WorkOrder.find_or_create_by(
          technician: technician,
          location: location,
          start_time: row['start_time'],
          duration: row['duration'].to_i,
          price: row['price'].to_f
        )
      end
      puts "Work Orders imported successfully."
    end
  end
  