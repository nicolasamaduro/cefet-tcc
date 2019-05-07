const synaptic = require( 'synaptic' );
const Normalizer = require( './normalizer' ).Normalizer;

const Perceptron = require( './perceptron' );

const Trainer = synaptic.Trainer;

const TRAINNING_DATA_RATE = 0.75;

function getDataNormalizer( data ) {
    var normalizer = new Normalizer( data );
    
    normalizer.setOutputProperties([ 'RESULTADO' ]);
    normalizer.normalize();

    var data = normalizer.getBinaryInputDataset().map( function ( input, index ) {
        return {
            input: input,
            output: normalizer.getBinaryOutputDataset()[index]
        }
    });

    normalizer.trainningData = getTrainningData( data );
    normalizer.testData = getTestData( data );

    return normalizer;
}

function getTrainningData( data ) {
    cutOff = Math.floor( data.length * TRAINNING_DATA_RATE );

    return data.slice( 0, cutOff );
}

function getTestData( data ) {
    cutOff = Math.floor( data.length * TRAINNING_DATA_RATE );

    return data.slice( cutOff, data.length - 1 );
}

function train( data, perceptron ) {

    inputLayerLength = Object.keys( data[ 0 ].input ).length;
    outputLayerLength = Object.keys( data[ 0 ].output ).length;
    
    var perceptron = new Perceptron( inputLayerLength, inputLayerLength * 2, 3 );
    var trainer = new Trainer( perceptron );

    trainer.train( data, {
        rate: 0.05,
        iterations: 20000,
        log: 1000,
        cost: Trainer.cost.MSE
    });

    return perceptron;
}

function test ( data, perceptron ) {
    var hits = 0;

    data.forEach ( function ( element, index ) {
        var networkResult = perceptron.activate( element.input );
        var indexOfMaxResult = networkResult.indexOf( Math.max.apply( null, networkResult ) );
        
        var processedResult = [
            indexOfMaxResult  == 0 ? 1 : 0,
            indexOfMaxResult  == 1 ? 1 : 0,
            indexOfMaxResult  == 2 ? 1 : 0
        ]

        if ( element.output[ 0 ] == processedResult[ 0 ] &&
             element.output[ 1 ] == processedResult[ 1 ] &&
             element.output[ 2 ] == processedResult[ 2 ] ) {
            hits++;
        }
            
    });

    return hits / data.length;
}

function exec ( data ) {
    
    var normalizer = getDataNormalizer( data );
    var perceptron = new Perceptron( normalizer.getInputLength(), normalizer.getInputLength() * 2, 3 );

    perceptron = train( normalizer.trainningData, perceptron );
    var testResult = test( normalizer.testData, perceptron );

    printStats( testResult, normalizer );
}

function printStats( testResult, normalizer ) {
    console.log( '\n\n\n***************************\n' );
    console.log( 'Estatísticas do experimento' );
    console.log( '\n***************************\n' );

    console.log( 'Quantidade de entradas de treinamento: ' + normalizer.trainningData.length );
    console.log( 'Quantidade de entradas de teste: ' + normalizer.testData.length );
    console.log( 'Resultado de acerto no teste real: ' + testResult );
}

module.exports = {
    exec: exec
}