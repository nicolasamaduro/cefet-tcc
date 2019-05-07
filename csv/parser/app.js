const torneiosParser = require( './torneios.parser' );
const temporadasParser  = require( './temporadas.parser' );
const atletasParser  = require( './atletas.parser' );
const elencoParser  = require( './elenco.parser' );
const clubesParser  = require( './clubes.parser' );
const clubesTemporadaParser  = require( './clubesTemporada.parser' );
const partidasParser  = require( './partidas.parser' );
const scoutsParser  = require( './scouts.parser' );

torneiosParser.generateCsv();
temporadasParser.generateCsv();
atletasParser.generateCsv();
elencoParser.generateCsv();
clubesParser.generateCsv();
clubesTemporadaParser.generateCsv();
partidasParser.generateCsv();
scoutsParser.generateCsv();