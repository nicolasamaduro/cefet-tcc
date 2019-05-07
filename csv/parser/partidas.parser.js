const fs        = require('fs');
const csv       = require('csv-parser');
const json2csv  = require('json2csv');

var dataArray = [];

const lista = [
    {
        filePath: '../data/2014_partidas.csv',
        idTemporada: 1
    },
    {
        filePath: '../data/2015_partidas.csv',
        idTemporada: 2
    },
    {
        filePath: '../data/2016_partidas.csv',
        idTemporada: 3
    },
    {
        filePath: '../data/2017_partidas.csv',
        idTemporada: 4
    },
];

var countId = 0;

function create (item, outputFilePath) {
    return new Promise( function (resolve, reject) {
        fs.createReadStream( item.filePath )
            .pipe(csv())
            .on('data', function (data) {
                data.id = ++countId;
                data.idTemporada = item.idTemporada;
                dataArray.push(data);
            })
            .on('end', function(){
                var result = json2csv({ data: dataArray, fields: ['id', 'rodada', 'clube_casa_id', 'clube_visitante_id', 'placar_oficial_mandante', 'placar_oficial_visitante', 'idTemporada'] });
                fs.writeFile(outputFilePath, result, function (err) {
                    if (err) reject(err);
                    console.log('Arquivo ' + outputFilePath + ' gerado com sucesso.');
                    resolve();
                });
            });
    });
}

function generateCsv () {

    var outputFilePath = '../dist/partidas.csv';

    fs.unlink (outputFilePath, async function (err) {
        if (err) console.log(err);

        for ( var i = 0; i < lista.length; i++ ) {    
            await create( lista [ i ], outputFilePath );
        }
    });
}

module.exports = {
    generateCsv: generateCsv
};