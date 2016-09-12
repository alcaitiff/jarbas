var fs = require('fs');
var path = require('path');

var FileRetriever = {
  readFile: function(path, callback) {
    fs.readFile(path, 'utf8', function(err, data) {
      if (err) throw err; // we'll not consider error handling for now
      var obj = JSON.parse(data);
      if (typeof callback === "function") {
        return callback(obj);
      } else {
        return obj;
      }
    });
  },
  getFiles: function(dirs, ignore, extensions) {
    var files = [];
    dirs.forEach(function(val, index) {
      this.walkSync(val, files, ignore, extensions);
    }, this);
    return files;
  },
  validFile: function(fileName, ignore, extensions) {
    var parts = fileName.split('.');
    var ext = (parts.length > 1) ? parts[parts.length - 1] : '';
    return (
      fileName.substr(0, 1) !== '.' &&
      ignore.indexOf(fileName) == -1 &&
      extensions.indexOf(ext) !== -1
    );
  },
  dirName: function(fullpath) {
    var dirs = fullpath.split('/');
    return dirs[dirs.length - 1];
  },
  walkSync: function(dir, filelist, ignore, extensions) {
    filelist = filelist || [];
    var dirName = this.dirName(dir);
    if ((dirName.substr(0, 1) === '.' && dirName.substr(1, 1) != null) ||
      ignore.indexOf(dirName) !== -1) {
      return filelist;
    }
    if (fs.statSync(dir).isDirectory()) {
      var files = fs.readdirSync(dir);
      files.forEach(function(file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
          filelist = this.walkSync(path.join(dir, file), filelist,
            ignore, extensions);
        } else if (this.validFile(file, ignore, extensions)) {
          filelist.push(path.join(dir, file));
        }
      }, this);
    } else {
      filelist.push(dir);
    }
    return filelist;
  }
};
module.exports = FileRetriever;
