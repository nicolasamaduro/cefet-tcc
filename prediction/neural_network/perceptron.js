const synaptic = require( 'synaptic' );

const Layer   = synaptic.Layer;
const Network = synaptic.Network;

function Perceptron( input, hidden, output ) {

    var inputLayer = new Layer(input);
    var hiddenLayer = new Layer(hidden);
    var outputLayer = new Layer(output);

    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    this.set({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
    });
}

Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

module.exports = Perceptron;