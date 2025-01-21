document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("open-space")) {
      console.log("Clicked on:", event.target);

      const technicianId = event.target.getAttribute("data-technician-id");
      const clickedHour = parseInt(event.target.getAttribute("data-hour"));

      // Fetch work orders for the clicked technician
      fetch(`/technicians/${technicianId}/work_orders`)
        .then(response => response.json())
        .then(data => {
          const gapTime = calculateGapBetweenPreviousAndNextWorkOrder(data, clickedHour);
          if (gapTime > 0) {
            alert(`Time available: ${gapTime} minutes between work orders.`);
          } else {
            alert("No available time between work orders.");
          }
        });
    }
  });
});

function calculateGapBetweenPreviousAndNextWorkOrder(workOrders, clickedHour) {
  const baseDate = new Date(0); // Reference date: 1970-01-01T00:00:00.000Z

  // Normalize work orders to a base date
  workOrders.forEach(workOrder => {
    const workOrderTime = new Date(workOrder.time);
    const normalizedStart = new Date(baseDate);
    normalizedStart.setUTCHours(workOrderTime.getUTCHours(), workOrderTime.getUTCMinutes(), 0, 0);

    const normalizedEnd = new Date(normalizedStart);
    normalizedEnd.setMinutes(normalizedStart.getMinutes() + workOrder.duration);

    workOrder.normalizedStart = normalizedStart;
    workOrder.normalizedEnd = normalizedEnd;
  });

  // Sort work orders by their normalized start times
  workOrders.sort((a, b) => a.normalizedStart - b.normalizedStart);

  let previousWorkOrderEnd = null;
  let nextWorkOrderStart = null;

  // Find the previous and next work orders surrounding the clicked hour
  for (let i = 0; i < workOrders.length; i++) {
    const workOrder = workOrders[i];
    const startOfClickedHour = new Date(baseDate);
    startOfClickedHour.setUTCHours(clickedHour + 1, 0, 0, 0); // Normalize clicked hour

    // Check for the previous work order (ends before the clicked hour)
    if (workOrder.normalizedEnd <= startOfClickedHour) {
      previousWorkOrderEnd = workOrder.normalizedEnd;
    }

    // Check for the next work order (starts after or at the clicked hour)
    if (workOrder.normalizedStart >= startOfClickedHour && nextWorkOrderStart === null) {
      nextWorkOrderStart = workOrder.normalizedStart;
    }
  }

  // If there's no previous or next work order found, return 0
  if (!previousWorkOrderEnd || !nextWorkOrderStart) {
    return 0;
  }

  // Calculate the gap in milliseconds
  const gapInMilliseconds = nextWorkOrderStart - previousWorkOrderEnd;
  const gapInMinutes = Math.floor(gapInMilliseconds / 60000); // Convert milliseconds to minutes

  return gapInMinutes;
}
