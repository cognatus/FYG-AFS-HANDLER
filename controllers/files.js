var controller = {};
//var multer = require('multer');
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');


//este metodo es para subir archivos con multer
/*var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, req.query.location);
    },
    filename: function (req, file, cb) {
        //var datetimestamp = Date.now();
        cb(null, 'weonada' + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});
var upload = multer({ //multer settings
    storage: storage
}).single('file');


controller.transfer = function (req, res, next, sql) {

    upload(req, res, function (err) {
        if (err) {
            res.status(500).send({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: null });
    });
}*/

//con esto borramos de DB y servidor archivos
controller.delete = function (req, res, next, sql) {
    fs.unlink(req.body.path, function (err) {
        if (err) {
            res.status(500).send(err)
        } else {
            var request = new sql.Request();
            request.query("DELETE FROM [dbo].[archivos] WHERE archivo = '" + req.body.file.archivo + "' and rubro = '" + req.body.file.rubro + "' and created_at = '" + req.body.file.created_at + "' and sucursal_clave = '" + req.body.file.sucursal_clave + "'", function (err, recordset) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.json(recordset);
                }
            });
        }
    });
}

//borra todos los archivos por rubro en servidor y base de datos
controller.deleteAll = function (req, res, next, sql) {

    var directory = req.body.path;

    //lee cuantos hay en el directorio
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
        console.log(files.length)
        //itera para borrar todos
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
            console.log((i + 1))
            //si esta a punto de borrar el ultimo, procede a empezar el borrado en base de datos
            if ((i + 1) === files.length) {
                var request = new sql.Request();
                request.query("DELETE FROM [dbo].[archivos] WHERE rubro = '" + req.body.rubro + "' and sucursal_clave = '" + req.body.sucursal_clave + "'", function (err, recordset) {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                    } else {
                        res.json(recordset);
                    }
                });
            }
        }
    });
}

//con esto añadimos archivos al servidor y base de datos
controller.transfer = function (req, res, next, sql) {

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.file.path;
        var newpath = req.query.location + '\\' + files.file.name;
        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                res.status(401).send(err);
            } else {
                var request = new sql.Request();
                var d = new Date();
                var query = 'INSERT INTO [dbo].[archivos]' +
                        '([created_at]' +
                        ',[archivo]' +
                        ',[sucursal_clave]' +
                        ',[rubro])' +
                        'VALUES' +
                        '(\''+d.toISOString().split("Z")[0]+'\''+
                    ',\''+files.file.name +
                    '\',\''+req.query.sucursal_clave+'\'' +
                        ',\''+req.query.rubro+'\');';
                request.query(query, function (err, recordset) {
                    if (err) {
                        console.log(err);
                        res.status(500).send(err);
                    } else {
                        res.json(recordset);
                    }
                });
            }
        });
    });
}

module.exports = controller;