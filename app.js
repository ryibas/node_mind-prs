var timeseries = require("timeseries-analysis");

var data = [0,1,0,2,1,0,1,0,2,1,0,2,2,1,1,0,0,1,0,0,2,2];
 
// Load the data
var t = new timeseries.main(timeseries.adapter.fromArray(data));
 
// We're going to forecast the 11th datapoint
var forecastDatapoint	= 2;	
 
// We calculate the AR coefficients of the dataset
var coeffs = t.ARMaxEntropy({
    data:	t.data
});
 
// Now, we calculate the forecasted value of the next datapoint using the AR coefficients:
var forecast	= 0;	// Init the value at 0.
for (var i=0;i<coeffs.length;i++) {	// Loop through the coefficients
    forecast -= t.data[10-i][1]*coeffs[i];
}

console.log("forecast",forecast);