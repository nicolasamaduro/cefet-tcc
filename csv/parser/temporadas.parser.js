const fs        = require('fs');
const json2csv  = require('json2csv');

var temporadas = [
    {
        id: 1,
        torneio_id: 1,
        year: 2014
    },
    {
        id: 2,
        torneio_id: 1,
        year: 2015
    },
    {
        id: 3,
        torneio_id: 1,
        year: 2016
    },
    {
        id: 4,
        torneio_id: 1,
        year: 2017
    }
];

function generateCsv () {
    return new Promise( function (resolve, reject) {
        var csvTemporadasData = json2csv({ data: temporadas, hasCSVColumnTitle: true });
        
        fs.writeFile('../dist/temporadas.csv', csvTemporadasData, function(err) {
            if (err) reject(err);
            console.log('Arquivo temporadas.csv gerado com sucesso.');
            resolve();
        });
    });
}

module.exports = {
    generateCsv: generateCsv
};