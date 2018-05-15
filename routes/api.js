var express = require('express');
var router = express.Router();
var files = require('../controllers/files');
var sql = require('mssql/msnodesqlv8');

//config to dbsqlserver
var config = {
  driver: 'msnodesqlv8',
  connectionString: 'Driver={SQL Server Native Client 11.0};Server={LAPTOP-TFBR1QTP};Database={fyg-afs-admin};Trusted_Connection={yes};',
};

sql.connect(config)
  .then(function () {
    console.log('Conectado')
  })
  .catch(function (err) {
    console.log(err);
  });

router.route('/files_transfer')
  .post(function (req, res, next) {
    files.transfer(req, res, next, sql);
  });

module.exports = router;
