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
    // Explanation for that line:
    // t.data contains the current dataset, which is in the format [ [date, value], [date,value], ... ]
    // For each coefficient, we substract from "forecast" the value of the "N - x" datapoint's value, multiplicated by the coefficient, where N is the last known datapoint value, and x is the coefficient's index.
}
console.log("forecast",forecast);
// Output: 92.7237232432106