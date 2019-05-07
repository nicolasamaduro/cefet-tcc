const fs        = require('fs');
const json2csv  = require('json2csv');

var torneios = [
    {
        id: 1,
        nome: 'Campeonato Brasileiro'
    }
];

function generateCsv () {
    return new Promise( function (resolve, reject) {
        var csvTorneiosData = json2csv({ data: torneios, hasCSVColumnTitle: true });
        
        fs.writeFile('../dist/torneios.csv', csvTorneiosData, function(err) {
            if (err) reject(err);
            console.log('Arquivo torneios.csv gerado com sucesso.');
            resolve();
        });
    });
}

module.exports = {
    generateCsv: generateCsv
};