// import * as ml from 'machine-learning';
var ml = require('machine-learning');
// Linear Regression: y = 1000 + 200 * x
const inputs = new ml.Matrix([[5], [7], [9], [11], [13]]);
const targets = new ml.Matrix([[2000], [2400], [2800], [3200], [3600]]);
 
const linearRegression = new ml.LinearRegression();
linearRegression.setNumberOfEpochs(10000);
linearRegression.setLearningRate(0.02);
 
linearRegression.train(inputs, targets);
const predictions = linearRegression.predict(inputs);
console.log(predictions.toArray());