const fs        = require('fs');
const csv       = require('csv-parser');
const json2csv  = require('json2csv');

var dataArray = [];

const lista = [
    {
        filePath: '../data/2014_atletas.csv'
    },
    {
        filePath: '../data/2015_atletas.csv'
    },
    {
        filePath: '../data/2016_atletas.csv'
    },
    {
        filePath: '../data/2017_atletas.csv'
    },
];

function create (item, outputFilePath) {
    return new Promise( function (resolve, reject) {
        fs.createReadStream( item.filePath )
            .pipe(csv())
            .on('data', function (data) {
                dataArray.push(data);
            })
            .on('end', function(){
                var result = json2csv({ data: dataArray, fields: ['id', 'apelido', 'posicao_id'] });
                fs.writeFile(outputFilePath, result, function (err) {
                    if (err) reject(err);
                    console.log('Arquivo ' + outputFilePath + ' gerado com sucesso.');
                    resolve();
                });
            });
    });
}

function generateCsv () {

    var outputFilePath = '../dist/atletas.csv';

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