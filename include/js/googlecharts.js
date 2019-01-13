$(window).on("load", function() {
  google.charts.load("current", { packages: ["bar"] });
  google.charts.load("current", { packages: ["corechart"] });

  $(".col-lg-3.tvShow").on("click", function(event) {
    let parentDiv = event.target.parentNode;
    let tvShowName = parentDiv.children[1].innerText;
    console.log("Tv Show Name: " + tvShowName);
    drawChartByName(tvShowName);
  });
});

function drawChartByName(name) {
  var jsonData = $.ajax({
    url: "https://yourslangapi.herokuapp.com/getTvShowByNameRoutes/" + name,
    dataType: "json", // type of data we're expecting from server
    async: false // make true to avoid waiting for the request to be complete
  });
  let tvShowName = jsonData.responseJSON[0].tvshowname;
  console.log("tvShowName " + tvShowName);
  let dataToDisplay = [];
  dataToDisplay.push(["", "", { role: "style" }]);
  jsonData.responseJSON[0].sentences.forEach(item => {
    let color;
    if (item.tweets.length <= 5) {
      color = "red";
    } else if (item.tweets.length > 5 && item.tweets.length <= 12) {
      color = "orange";
    } else {
      color = "green";
    }
    dataToDisplay.push([item.text, item.tweets.length, color]);
  });

  var data = google.visualization.arrayToDataTable(dataToDisplay);

  var options = {
    chart: {
      title: tvShowName,
      fontSize: 22,
      fontName: "Arial"
    },
    hAxis: {
      title: "כמות ציוצים",
      titleTextStyle: {
        fontSize: 22,
        fontName: "Arial"
      },

      textStyle: {
        fontSize: 20
      }
    },
    vAxis: {
      title: "ביטוי",
      titleTextStyle: {
        fontSize: 22,
        fontName: "Arial"
      },
      maxValue: 15,
      textStyle: {
        fontSize: 20,
        paddingRight: "200",
        marginRight: "200",
        paddingTop: "100",
        marginTop: "100"
      }
    },
    height: 1000,
    width: 1000,
    bars: "horizontal", // Required for Material Bar Charts.
    legend: { position: "none" },
    chartArea: { left: 400, width: "80%" }
  };

  var chart = new google.visualization.BarChart(
    document.getElementById("barchart_material")
  );
  chart.draw(data, google.charts.Bar.convertOptions(options));
}
