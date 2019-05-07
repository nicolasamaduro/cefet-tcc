mysql -u tcc --password=12345 soccer_prediction < 01__structure.sql
./02__seed.sh
mysql -u tcc --password=12345 soccer_prediction < 03__remove_duplicas.sql
mysql -u tcc --password=12345 soccer_prediction < 04__constraints.sql