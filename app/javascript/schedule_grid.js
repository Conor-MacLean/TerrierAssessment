console.log("schedule_grid.js loaded")
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded.");

  // Add event listener to the body (or a specific parent container)
  document.body.addEventListener('click', function (event) {
    // Check if the clicked element has the 'open-space' class
    if (event.target.classList.contains('open-space')) {
      console.log("Clicked on:", event.target);
      // Retrieve data attributes
      const technicianId = event.target.getAttribute('data-technician-id');
      const hour = event.target.getAttribute('data-hour');
      
      // Fetch work orders for the technician at the clicked hour
      fetch(`/technicians/${technicianId}/work_orders`)
        .then(response => response.json())
        .then(data => {
          const nextAvailableTime = calculateAvailableTime(data, hour);
          alert(`Available time: ${nextAvailableTime} minutes`);
        });
    }
  });
});

// Helper function to calculate available time (example logic)
function calculateAvailableTime(workOrders, clickedHour) {
  const availableTime = 60; // Placeholder logic; replace with your own calculation
  return availableTime;
}
