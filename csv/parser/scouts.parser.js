const fs        = require('fs');
const csv       = require('csv-parser');
const json2csv  = require('json2csv');

var dataArray = [];

const lista = [
    {
        filePath: '../data/2014_scouts.csv',
        idTemporada: 1
    },
    {
        filePath: '../data/2015_scouts.csv',
        idTemporada: 2
    },
    {
        filePath: '../data/2016_scouts.csv',
        idTemporada: 3
    },
    {
        filePath: '../data/2017_scouts.csv',
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
                var result = json2csv({ data: dataArray, fields: ['id', 'atleta_id', 'rodada', 'idTemporada', 'clube_id', 'posicao_id', 'participou', 'pontos_num', 'partida_id', 'titular', 'substituido', 'tempo_jogado',"nota","FS","PE","A","FT","FD","FF","G","I","PP","RB","FC","GC","CA","CV","SG","DD","DP","GS"]});
                fs.writeFile(outputFilePath, result, function (err) {
                    if (err) reject(err);
                    console.log('Arquivo ' + outputFilePath + ' gerado com sucesso.');
                    resolve();
                });
            });
    });
}

function generateCsv () {

    var outputFilePath = '../dist/SCOUTS.csv';

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