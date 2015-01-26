//var ZooKeeper = require('zookeeper');
var ZooKeeper = require('zookeeper/lib/zk_promise');
//https://github.com/dannycoates/zkjs


var zookeeper = function () {
  return {
    config : function(app) {
      this.zk_config = {
        connect: "192.168.59.103:49159"
        ,timeout: 3000
        ,debug_level: ZooKeeper.ZOO_LOG_LEVEL_WARN
        ,host_order_deterministic: false
      };
      this.zk = new ZooKeeper().init(this.zk_config);
      this.zk.data_as_buffer = false;
    },

    rawGet : function(path, callback) {
      var _this = this;
      this.zk.connect(function (err) {
        if (err) {
          callback(null);
        } else {
          _this.zk.a_get(path, false, function (rc, err, stat, data) {
            if (err != "ok" || typeof data != "string") {
              callback({ result: err});
            } else {
              var data_object = JSON.parse(data);
              callback(data_object);
            }
          });
        }
      });
    },
    rawGetChildren : function(path, callback) {
      var _this = this;
      this.zk.connect(function (err) {
        if (err) {
          callback([])
        } else {
          _this.zk.a_get_children(path, false, function (rc, err, children) {
            callback(err != "ok" ? err : children);
          });
        }
      });
    }


  };
};

module.exports = new zookeeper();
