document.addEventListener("DOMContentLoaded", () => {
    const columns = document.querySelectorAll(".technician-column");
  
    columns.forEach((column) => {
      column.addEventListener("click", (e) => {
        if (!e.target.closest(".work-order-block")) {
          const columnBounds = column.getBoundingClientRect();
          const clickY = e.clientY - columnBounds.top;
  
          const blocks = Array.from(
            column.querySelectorAll(".work-order-block")
          );
          const prevBlock = blocks
            .filter((block) => block.offsetTop + block.offsetHeight < clickY)
            .pop();
          const nextBlock = blocks.find(
            (block) => block.offsetTop > clickY
          );
  
          const availableTime = (() => {
            const prevEnd = prevBlock
              ? parseInt(prevBlock.dataset.endTime)
              : 0;
            const nextStart = nextBlock
              ? parseInt(nextBlock.dataset.startTime)
              : 24 * 60; // end of day in minutes
            return Math.max(nextStart - prevEnd, 0);
          })();
  
          alert(
            `Available time: ${
              Math.floor(availableTime / 60)
            } hours and ${availableTime % 60} minutes.`
          );
        }
      });
    });
  });
  