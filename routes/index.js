var express = require('express');
var router = express.Router();
var fs = require("fs");
var JFUM = require('JFUM');
var jfum = new JFUM({
    tmpDir: '/tmp',
    minFileSize: 204800,  // 200 kB
    maxFileSize: 5242880, // 5 mB
    acceptFileTypes: /\.(gif|jpe?g|png)$/i
});




/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: '考核作业上传' });
});


app.post('/upload', jfum.postHandler.bind(jfum), function(req, res) {
    var username = req.body.username,
        file = req.body.file;

    for (var i = 0; i < res.jfum.files.length; i++) {
        var file = res.jfum.files[i];
        if (typeof file === 'object' && typeof file.error === 'undefined') {
            var tmpPath = file.path,
                fileName = file.name,
                fileSize = file.size,
                targetPath = "./uploads" + username + " - " + fileName,
                type = file.type;

            console.log("the File Size: ", fileSize);

            fs.renname(tmpPath, targetPath, function(err){
                if(err) throw err;

                // 删除临时文件
                fs.unlink(tmpPath, function(){
                    if (err) throw err;
                    res.send('File uploaded to: ' + targetPath + ' - ' + fileSize + ' bytes');
                })
            });
            // file.path - file location on disk
            // file.name - original file name
            // file.size - file size on disk
            // file.mime - file mime type
        } else {
            // the file was rejected or not uploaded correctly
            // error message will be in req.jfum.error
        }
    }
});


module.exports = router;
