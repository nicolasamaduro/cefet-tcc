mysqlimport --ignore-lines=1 \
            --fields-terminated-by=, \
            --local -u tcc --password=12345 \
            --delete \
            --columns ID,NOME \
            --fields-enclosed-by='\"' \
            soccer_prediction \
            ../csv/dist/TORNEIO.csv

mysqlimport --ignore-lines=1 \
            --fields-terminated-by=, \
            --local -u tcc --password=12345 \
            --delete \
            --columns ID,TORNEIO_ID,YEAR \
            --fields-enclosed-by='\"' \
            soccer_prediction \
            ../csv/dist/TEMPORADA.csv

mysqlimport --ignore-lines=1 \
            --fields-terminated-by=, \
            --local -u tcc --password=12345 \
            --delete \
            --columns ID,NOME,ABREVIACAO \
            --fields-enclosed-by='\"' \
            soccer_prediction \
            ../csv/dist/POSICAO.csv

mysqlimport --ignore-lines=1 \
            --fields-terminated-by=, \
            --local -u tcc --password=12345 \
            --delete \
            --columns ABREVIACAO,NOME,PONTUACAO \
            --fields-enclosed-by='\"' \
            soccer_prediction \
            ../csv/dist/PONTUACAO.csv

mysqlimport --ignore-lines=1 \
            --fields-terminated-by=, \
            --local -u tcc --password=12345 \
            --delete --default-character-set=utf8 \
            --columns ID,NOME,ABREVIACAO,SLUG \
            --fields-enclosed-by='\"' \
            soccer_prediction \
            ../csv/dist/TMP_CLUBE.csv

mysqlimport --ignore-lines=1 \
            --fields-terminated-by=, \
            --local -u tcc --password=12345 \
            --delete --default-character-set=utf8 \
            --columns CLUBE_ID,TEMPORADA_ID \
            --fields-enclosed-by='\"' \
            soccer_prediction \
            ../csv/dist/CLUBE_TEMPORADA.csv

mysqlimport --ignore-lines=1 \
            --fields-terminated-by=, \
            --local -u tcc --password=12345 \
            --delete --default-character-set=utf8 \
            --columns ID,APELIDO,POSICAO_ID \
            --fields-enclosed-by='\"' \
            soccer_prediction \
            ../csv/dist/TMP_ATLETA.csv

mysqlimport --ignore-lines=1 \
            --fields-terminated-by=, \
            --local -u tcc --password=12345 \
            --delete --default-character-set=utf8 \
            --columns ATLETA_ID,CLUBE_ID,TEMPORADA_ID \
            --fields-enclosed-by='\"' \
            soccer_prediction \
            ../csv/dist/TMP_ELENCO.csv

mysqlimport --ignore-lines=1 \
            --fields-terminated-by=, \
            --local -u tcc --password=12345 \
            --delete --default-character-set=utf8 \
            --columns ID,RODADA,CLUBE_CASA_ID,CLUBE_VISITANTE_ID,PLACAR_OFICIAL_MANDANTE,PLACAR_OFICIAL_VISITANTE,TEMPORADA_ID \
            --fields-enclosed-by='\"' \
            soccer_prediction \
            ../csv/dist/PARTIDA.csv

mysqlimport --ignore-lines=1 \
            --fields-terminated-by=, \
            --local -u tcc --password=12345 \
            --delete --default-character-set=utf8 \
            --columns ID,ATLETA_ID,RODADA,TEMPORADA_ID,CLUBE_ID,POSICAO_ID,PARTICIPOU,PONTOS_NUM,PARTIDA_ID,TITULAR,SUBSTITUIDO,TEMPO_JOGADO,NOTA,FS,PE,A,FT,FD,FF,G,I,PP,RB,FC,GC,CA,CV,SG,DD,DP,GS \
            --fields-enclosed-by='\"' \
            soccer_prediction \
            ../csv/dist/SCOUTS.csv