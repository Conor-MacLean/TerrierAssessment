document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener('click', function (event) {
    if (event.target.classList.contains('open-space')) {
      console.log("Clicked on:", event.target);

      // Get the technician id and clicked hour
      const technicianId = event.target.getAttribute('data-technician-id');
      const clickedHour = parseInt(event.target.getAttribute('data-hour'));
      console.log(`Technician ID: ${technicianId}, Clicked Hour: ${clickedHour}`);

      // Fetch work orders for the clicked technician
      fetch(`/technicians/${technicianId}/work_orders`)
        .then(response => response.json())
        .then(data => {
          const availableTime = calculateAvailableTime(data, clickedHour);
          console.log(`Calculated Available Time: ${availableTime} minutes`);
          alert(`Available time: ${availableTime} minutes`);
        });
    }
  });
});

function calculateAvailableTime(workOrders, clickedHour) {
  // Normalize clicked hour to a base date (e.g., 1970-01-01)
  const baseDate = new Date(0); // Reference date: 1970-01-01T00:00:00.000Z
  const startOfClickedHour = new Date(baseDate);
  startOfClickedHour.setUTCHours(clickedHour, 0, 0, 0); // Set only the hour

  const endOfClickedHour = new Date(startOfClickedHour);
  endOfClickedHour.setUTCHours(clickedHour + 1); // One hour later

  console.log(`Normalized start of clicked hour: ${startOfClickedHour}`);
  console.log(`Normalized end of clicked hour: ${endOfClickedHour}`);

  // Normalize work order times to the base date
  workOrders.forEach(workOrder => {
    const workOrderTime = new Date(workOrder.time);
    const normalizedStart = new Date(baseDate);
    normalizedStart.setUTCHours(workOrderTime.getUTCHours(), workOrderTime.getUTCMinutes(), 0, 0);

    const normalizedEnd = new Date(normalizedStart);
    normalizedEnd.setMinutes(normalizedStart.getMinutes() + workOrder.duration);

    workOrder.normalizedStart = normalizedStart;
    workOrder.normalizedEnd = normalizedEnd;

    console.log(`Work order normalized start: ${normalizedStart}`);
    console.log(`Work order normalized end: ${normalizedEnd}`);
  });

  // Sort work orders by their normalized start times
  workOrders.sort((a, b) => a.normalizedStart - b.normalizedStart);

  let previousWorkOrderEnd = null;
  let nextWorkOrderStart = null;

  // Loop through the work orders to find the previous and next work orders
  workOrders.forEach(workOrder => {
    if (workOrder.normalizedEnd <= startOfClickedHour) {
      previousWorkOrderEnd = workOrder.normalizedEnd;
      console.log(`Previous work order end: ${previousWorkOrderEnd}`);
    }

    if (
      nextWorkOrderStart === null && // Find the first work order that starts at or after the clicked hour
      workOrder.normalizedStart >= startOfClickedHour
    ) {
      nextWorkOrderStart = workOrder.normalizedStart;
      console.log(`Next work order start: ${nextWorkOrderStart}`);
    }
  });

  // Handle edge cases
  if (!previousWorkOrderEnd && !nextWorkOrderStart) {
    console.log("No work orders in this technician's schedule.");
    return 60; // Entire hour is available
  }

  if (!previousWorkOrderEnd) {
    console.log("No previous work order found.");
    previousWorkOrderEnd = startOfClickedHour; // Start of clicked hour
  }

  if (!nextWorkOrderStart) {
    console.log("No next work order found.");
    nextWorkOrderStart = endOfClickedHour; // End of clicked hour
  }

  // Calculate available time
  const availableTimeInMilliseconds = nextWorkOrderStart - previousWorkOrderEnd;
  const availableTimeInMinutes = Math.max(0, Math.floor(availableTimeInMilliseconds / 60000)); // Convert ms to minutes
  console.log(`Calculated available time: ${availableTimeInMinutes} minutes`);
  return availableTimeInMinutes;
}
