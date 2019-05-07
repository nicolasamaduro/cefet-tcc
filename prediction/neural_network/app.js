const inputNeuralNetwork = require( '../model/inputNeuralNetwork.model' );
const artificialNeuralNetwork = require( './artificialNeuralNetwork' );

inputNeuralNetwork.all().then( artificialNeuralNetwork.exec );