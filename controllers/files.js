var controller = {};
var multer = require('multer');

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, req.query.location);
    },
    filename: function (req, file, cb) {
        //var datetimestamp = Date.now();
        cb(null, 'weonada' + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});
var upload = multer({ //multer settings
                storage: storage
            }).single('file');


controller.transfer = function (req, res, next, sql) {
    
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json({error_code:0,err_desc:null});
    })
}

module.exports = controller;