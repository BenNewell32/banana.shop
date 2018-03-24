///////////////////////////
//ADD CLICK COUNT TO PAGE// DONE
///////////////////////////
getClicks();
var allClicks;
function getClicks(){
  // Send the PUT request.
  $.ajax("/api/clicks", {
    type: "GET"
  }).then(
    function(data) {
      allClicks= data.clicks;
      findProductsOnPage();
    }
  );
};

function findProductsOnPage(){
  var products = document.querySelectorAll('.clicksArea');
  // console.log(allClicks);
   console.log("gotem" , products);
  
  products.forEach((product)=> {
    var prodID= parseInt(product.attributes.prodid.nodeValue);
    console.log("Start new product ID:",prodID);
    
    var count = 0;
    console.log("reset count to",count);
    console.log("start running through click table", allClicks.length);
    for (i=0; i<allClicks.length;i++){  
      clickprodid= parseInt(allClicks[i].product_id);
      if (prodID===clickprodid){
        console.log("compare ",prodID,clickprodid);
        count=allClicks[i].clickCount;
        console.log("increased count to: ",count);
      }
    }
    product.attributes.clickcount.nodeValue=count;
    product.innerHTML = "<h5>exposure: "+count+"</h5>";
   
    // console.log("Product count =",product.attributes.clickcount.nodeValue)
    });
  };
/////////////////////////////
//TOTALS FOR ANALYTICS PAGE//
/////////////////////////////

////////////////////
//TOTAL USER COUNT// DONE
////////////////////
getUserTotal();
var allUsers;
function getUserTotal(){
  // Send the PUT request.
  $.ajax("/api/users", {
    type: "GET"
  }).then(
    function(data) {
      allUsers= data;
      sumUsers();
    }
  );
};

function sumUsers(){
  // console.log("now scope is correct",allUsers.length)
  var userTotal = document.querySelectorAll('#BAusers')
  // console.log(userTotal)
  userTotal.forEach((userTotal)=> {
    userTotal.innerHTML = allUsers.length ;
  })
};

//////////////////////
//TOTAL CLIENT COUNT// DONE
//////////////////////
getClientCount();
var totalClients;
function getClientCount(){
  // Send the PUT request.
  $.ajax("/api/orders", {
    type: "GET"
  }).then(
    function(data) {
      totalClients= data;
      orderCount();
    }
  );
};

function orderCount(){
  // console.log("now scope is correct",totalClients)
  var clientTotal = document.querySelectorAll('#BAclients')
  // console.log(clientTotal)
  clientTotal.forEach((clientTotal)=> {
    clientTotal.innerHTML = totalClients.length;
    salesTotal();
  })
};

///////////////
//SALES TOTAL// DONE +
///////////////
var salesIncrement=0;
var formatSales;
function salesTotal(){
  // console.log('in scope',totalClients);
  totalClients.forEach((order)=> {
    // console.log("item price: ",parseInt(order.price));
    var price= parseInt(order.price);
    var qty = order.qty;
    var sum = price * qty;
    // console.log(price);
    // console.log(qty);
    // console.log(price * qty);
    // console.log("summed ", sum);
    salesIncrement=salesIncrement+sum;
  });
  console.log(salesIncrement);
  formatSales = "$"+salesIncrement;
  console.log(formatSales);
  addSalestoPage();
};

function addSalestoPage(){
  // console.log("now scope is correct",totalClients)
  var salesTotal = document.querySelectorAll('#BAsales')
  // console.log(clientTotal)
  salesTotal.forEach((salesTotal)=> {
    salesTotal.innerHTML = formatSales;
    createSalesChart();
  })
};

////////////////////////
//SALES TIMELINE CHART//
////////////////////////
$(window).resize(function() {
  if(this.resizeTO) clearTimeout(this.resizeTO);
  this.resizeTO = setTimeout(function() {
      $(this).trigger('resizeEnd');
  });
});
$(window).on('resizeEnd', function() {
  createSalesChart();
});

function createSalesChart(){
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    dateCapture=[];
    chartArray= [['Date','Sales']];
    // console.log("check scope",totalClients);

    //create x axis//
    for (i=0; i<totalClients.length; i++){
      // console.log(totalClients[i].create_date.toString());
      newdate = totalClients[i].create_date.toString();
      // console.log(newdate.substring(0,10));
      if (dateCapture.indexOf(newdate.substring(0,10))<0){
        dateCapture.push(newdate.substring(0,10));
      }
    }
    // console.log(dateCapture);

    //start building dataSalesChart array
    chartArray= [['Date','Sales']];
    for (i=0;i<dateCapture.length;i++){
      chartArray.push([dateCapture[i],0]);
    }
    // console.log(chartArray);

    //add sales into array for each day
    count=0;
    for (i=1;i<chartArray.length;i++){
      dateBin =chartArray[i][0];
      console.log(dateBin);
      // count++;
      // console.log(count);
      calculateSales();
      drawProductChart();
    }

    function calculateSales(){
      for (l=0; l<144; l++){
        // console.log(totalClients);
        // console.log("datebin ",dateBin);
        // console.log("order date ", totalClients[l].create_date.toString().substring(0,10));
        

        newdate = totalClients[l].create_date.toString();
        if (chartArray[i][0]===newdate.substring(0,10)){
          chartArray[i][1]=chartArray[i][1]+(totalClients[l].price*totalClients[l].qty);
        }
      }
    }
    console.log(chartArray);

var dataSalesChart= chartArray;
    // var dataSalesChart= [
    //   ['Date', 'Clicks'],
    //   ['0',  0],
    //   ['2002',  1170],
    //   ['2003',  610],
    //   ['2004',  1260],
    //   ['2005',  1560],
    //   ['2006',  560],
    //   ['2007',  260],
    //   ['2008',  1030]
    // ];
    var data = google.visualization.arrayToDataTable(dataSalesChart);

    var options = {
      
      legend:{position:'none'},
      hAxis: {
        baselineColor: 'transparent',
        // textStyle: {color: 'transparent'}
      },
      vAxis: {
        // textStyle: {color: 'transparent'},
        baselineColor: 'transparent',
        minValue: 0,
        gridlines: {
        color: 'transparent'
        }
      },
      lineWidth: 2,
      series: {
        0: {color:'#ADB227'}
      }
    };
    var salesTimeline = document.querySelectorAll('.sales_chart');
    // console.log(products);

    salesTimeline.forEach((saleschart)=> {
      var chart = new google.visualization.AreaChart(saleschart);
      chart.draw(data, options);
    });
  }
}

//////////////////////
//TOP PRODUCTS CHART//
//////////////////////
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawProductChart);

function drawProductChart() {

  var data = google.visualization.arrayToDataTable([
    ['User', 'Sales',{role: 'style'}],
    ['Benny', 8175000,'stroke-color: #818B75; stroke-width: 2;fill-color: #bed287; color: #818B75' ],
    ['Bubba', 3792000,'stroke-color: #818B75; stroke-width: 2;fill-color: #bed287; color: #818B75'],
    ['Fred', 2695000,'stroke-color: #818B75; stroke-width: 2;fill-color: #bed287; color: #818B75'],
    ['NaeNAe', 2099000,'stroke-color: #818B75; stroke-width: 2;fill-color: #bed287; color: #818B75'],
    ['Alli-baba', 1526000,'stroke-color: #818B75; stroke-width: 2;fill-color: #bed287; color: #818B75']
  ]);

  var options = {
    legend:{position:'none'},
    height: 300,
    chartArea: {width: '50%'},
    hAxis: {
      baselineColor: 'transparent',
      minValue: 0
    },
    vAxis: {
    }
  };

  var chart = new google.visualization.BarChart(document.getElementById('prod_div'));

  chart.draw(data, options);
    }




///////////////////////////////////////
//ADD CHART TO ANALYTICS/PRODUCT PAGE// NOT DONE
///////////////////////////////////////
google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);


      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Year', 'Clicks'],
          ['0',  0],
          ['2002',  1170],
          ['2003',  610],
          ['2004',  1260],
          ['2005',  1560],
          ['2006',  560],
          ['2007',  260],
          ['2008',  1030]
        ]);

        var options = {
          legend:{position:'none'},
          hAxis: {
            baselineColor: 'transparent',
            textStyle: {color: 'transparent'}
          },
          vAxis: {
            textStyle: {color: 'transparent'},
            baselineColor: 'transparent',
            minValue: 0,
            gridlines: {
              color: 'transparent'
            }
          },
          lineWidth: 2,
          series: {
            0: {color:'#ADB227'}
          }
        };
        var products = document.querySelectorAll('.chart_div');
        // console.log(products);

        products.forEach((product)=> {
          var chart = new google.visualization.AreaChart(product);
          chart.draw(data, options);
        });

      }