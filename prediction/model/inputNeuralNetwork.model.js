const Sequelize = require( 'sequelize' );

const seq = new Sequelize( 'soccer_prediction', 'tcc', '12345', { 
    host: 'localhost', 
    port: 3306, 
    dialect: 'mysql',
    define: {
        timestamps: false
    },
    logging: false,
    dialectOptions: {
        decimalNumbers: true
    }
});

const InputNeuralNetwork = seq.define( 'TMP_INPUT_REDE_NEURAL', {
    MEDIA_GOLS_REALIZADOS_MANDANTE: Sequelize.DECIMAL,
    MEDIA_GOLS_SOFRIDOS_MANDANTE: Sequelize.DECIMAL,
    MEDIA_GOLS_REALIZADOS_VISITANTE: Sequelize.DECIMAL,
    MEDIA_GOLS_SOFRIDOS_VISITANTE: Sequelize.DECIMAL,
    NUM_VITORIAS_ULTIMOS_5_JOGOS_MANDANTE: Sequelize.INTEGER,
    NUM_EMPATES_ULTIMOS_5_JOGOS_MANDANTE: Sequelize.INTEGER,
    NUM_DERROTAS_ULTIMOS_5_JOGOS_MANDANTE: Sequelize.INTEGER,
    NUM_VITORIAS_ULTIMOS_5_JOGOS_VISITANTE: Sequelize.INTEGER,
    NUM_EMPATES_ULTIMOS_5_JOGOS_VISITANTE: Sequelize.INTEGER,
    NUM_DERROTAS_ULTIMOS_5_JOGOS_VISITANTE: Sequelize.INTEGER,
    FORCA_MANDANTE: Sequelize.DECIMAL,
    FORCA_VISITANTE: Sequelize.DECIMAL,
    RESULTADO: Sequelize.INTEGER
}, {
    freezeTableName: true
});

InputNeuralNetwork.removeAttribute( 'id' );

function findAll () {
    return InputNeuralNetwork.findAll({ raw: true }).then( function (result) {
        seq.close();

        result = result.map( function ( data ) {
            data.RESULTADO = resultToFuzzyValue( data.RESULTADO );
            return data;
        });

        return result;
    });
}

function resultToFuzzyValue ( result ) {
    if ( result == 1 ) return 'Mandante'
    if ( result == 2 ) return 'Empate'
    return 'Visitante'
}


module.exports = {
    all: findAll
}