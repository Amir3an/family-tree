document.addEventListener("DOMContentLoaded", function () {
  var orgChartDiv = document.querySelector(".org-chart");
  var scrollDiv = document.querySelector(".scroll");
  var scale = 1;
  var isDragging = false;
  var startX, startY, scrollLeft, scrollTop;

  var hoverBosses = document.querySelectorAll(".hoverBoss");

  for (var i = 0; i < hoverBosses.length; i++) {
    hoverBosses[i].addEventListener("mouseenter", function () {
      var childNodes = this.parentElement.querySelectorAll("ul .node");
      for (var j = 0; j < childNodes.length; j++) {
        childNodes[j].style.backgroundColor = "#cdcdcd";
      }
    });

    hoverBosses[i].addEventListener("mouseleave", function () {
      var childNodes = this.parentElement.querySelectorAll("ul .node");
      for (var j = 0; j < childNodes.length; j++) {
        childNodes[j].style.backgroundColor = "";
      }
    });
  }

  // Zoom in and out
  document.getElementById("zoomIn").addEventListener("click", function () {
    scale += 0.1;
    orgChartDiv.style.transform = "scale(" + scale + ")";
  });

  document.getElementById("zoomOut").addEventListener("click", function () {
    if (scale > 0.1) {
      scale -= 0.1;
      orgChartDiv.style.transform = "scale(" + scale + ")";
    }
  });

  document.getElementById("fitToScreen").addEventListener("click", function () {
      orgChartDiv.style.transform = "scale(0.6)";
      scale = 0.6;
  });

  document.getElementById("actualSize").addEventListener("click", function () {
    orgChartDiv.style.transform = "scale(1)";
    scale = 1;
  });

  // Drag to scroll
  scrollDiv.addEventListener("mousedown", function (e) {
    isDragging = true;
    startX = e.pageX - scrollDiv.offsetLeft;
    startY = e.pageY - scrollDiv.offsetTop;
    scrollLeft = scrollDiv.scrollLeft;
    scrollTop = scrollDiv.scrollTop;
  });

  scrollDiv.addEventListener("mouseleave", function () {
    isDragging = false;
  });

  scrollDiv.addEventListener("mouseup", function () {
    isDragging = false;
  });

  scrollDiv.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    e.preventDefault();
    var x = e.pageX - scrollDiv.offsetLeft;
    var y = e.pageY - scrollDiv.offsetTop;
    var walkX = (x - startX) * 2; // تنظیم سرعت اسکرول به دلخواه
    var walkY = (y - startY) * 2;
    scrollDiv.scrollLeft = scrollLeft - walkX;
    scrollDiv.scrollTop = scrollTop - walkY;
  });
});