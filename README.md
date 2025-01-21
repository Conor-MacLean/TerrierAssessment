# Terrier Rails Assessment

This Ruby on Rails application is a work order scheduling system that manages technicians, locations, and work orders. It displays a scheduling grid for a specific day and allows users to interact with the schedule to view how much time they have between work orders.

---

## Requirements

### Ruby and Rails Versions
- **Ruby version**: 3.4.1
- **Rails version**: 8.0.1
### System Dependencies
- Ruby and Rails installed on your system.
- Bundler for managing dependencies.

---

## Setup Instructions

### 1. Clone the Repository

git clone https://github.com/Conor-MacLean/TerrierAssessment.git
cd TerrierAssessment

### 2. Install Dependencies
bundle install

### 3. Setup Database
rails db:create
rails db:migrate
rails import:all

### 4. Launch server
bin/rails server

### 5. Navigate to webpage
http://localhost:3000

## Approach and Problems Faced
The main approach I used was largely following the ruby on rails getting started guide. I had never used this pipeline before so one of the largest challenges I faced was getting aquainted with said pipeline. Once I had the basics of ruby on rails understood I was then able to fall back on the development style I have used throughout school and my previous internship in order to create a relatively clean looking front end and an acceptable back end for the task presented to me. I am aware that there are some flaws, such as minimal endpoints and highly specific edge cases. I believe that with more practice with ruby on rails I would be able to complete this to a higher standard. I also ran into difficulties attempting to deploy on Heroku and Render. The issues I ran into when trying to deploy on Render implied I had issues with my database saying that the tables don't exist but I can discern why.
