//var ZooKeeper = require('zookeeper');
var ZooKeeper = require('zookeeper/lib/zk_promise');
//https://github.com/dannycoates/zkjs


var zookeeper = function () {
  return {
    config : function(app) {
      //this.zk = new ZooKeeper({
      //  connect: "192.168.59.103:49159"
      //  ,timeout: 3000
      //  ,debug_level: ZooKeeper.ZOO_LOG_LEVEL_WARN
      //  ,host_order_deterministic: false
      //});
      this.zk_config = {
        connect: "192.168.59.103:49159"
        ,timeout: 3000
        ,debug_level: ZooKeeper.ZOO_LOG_LEVEL_WARN
        ,host_order_deterministic: false
      };
      this.zk = new ZooKeeper().init(this.zk_config);
      this.zk.data_as_buffer = false;
    },
    context : {},


    get_path: function(path, callback) {
      var self = this;
      console.log('get -> ', path, self.context);
      delete self.context.stack[path];
      callback();
    },

    browse_path: function(path, callback) {
      var self = this;
      console.log('browse', path, self.context.stack);
      this.zk.get_children(path, false, function (rc, err, children) {
        children.forEach(function(child) {
          console.log("feach ", child, self.context);
          self.context.stack[path + "/" + child] = { path: path + "/" + child };
        });
        children.forEach(function(child) {
          self.get_path(path + "/" + child, callback);
        });
        //self.context.stack.push(children);
      });
    },

    get_topics: function(callback) {
      var self = this;
      this.context.stack = {};
      this.browse_path("/brokers/topics", function() {
        console.log("callback : " , self.context);
        if (Object.keys(self.context.stack).length == 0) {
          console.log("Done. Sending callback");
          callback("success", ['fewfe', 'fwefwef']);
        }
      });
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


    //rawGet : function(path, callback) {
    //  var _this = this;
    //  console.log('get ', path);
    //  this.zk.start(function (err) {
    //    _this.zk.get(
    //      path,
    //      function (err, data, zstat) {
    //        callback(data);
    //      }
    //    );
    //  });
    //},
    //rawGetChildren : function(path, callback) {
    //  var _this = this;
    //  console.log('get ', path);
    //  this.zk.start(function (err) {
    //    _this.zk.getChildren(
    //      path,
    //      function (err, children, zstat) {
    //        console.log(children);
    //        callback(children);
    //      }
    //    );
    //  });
    //},

    //
    ////https://cwiki.apache.org/confluence/display/KAFKA/Kafka+data+structures+in+Zookeeper
    //getTopics : function(callback) {
    //  console.log('zookeeper get');
    //  var _this = this;
    //  this.zk.start(function (err) {
    //    _this.zk.getChildren(
    //      '/brokers/topics',
    //      function (err, children, zstat) {
    //        if (!err) callback(children);
    //        //console.log(zstat);
    //      }
    //    );
    //  });
    //},
    //
    //getTopicInfo : function(topic, callback) {
    //  var _this = this;
    //  this.zk.start(function (err) {
    //    _this.zk.get(
    //      '/brokers/topics/' + topic,
    //      function (err, data, zstat) {
    //        callback({ data: data, stat: zstat});
    //      }
    //    );
    //  });
    //},
    //
    //getTopicPartitionInfo : function(topic, partitionid, callback) {
    //  var _this = this;
    //  console.log('partition info ' + '/brokers/topics/' + topic + '/partitions/' + partitionid + '/state');
    //  this.zk.start(function (err) {
    //    _this.zk.get(
    //      '/brokers/topics/' + topic + '/partitions/' + partitionid + '/state',
    //      function (err, data, zstat) {
    //        callback({ data: data, stat: zstat});
    //      }
    //    );
    //  });
    //},
    //
    //getTopicPartitions : function(topic, callback) {
    //  var _this = this;
    //  this.zk.start(function (err) {
    //    _this.zk.getChildren(
    //      '/brokers/topics/' + topic + '/partitions',
    //      function (err, data, zstat) {
    //        callback({ data: data, stat: zstat});
    //      }
    //    );
    //  });
    //}

  };
};

module.exports = new zookeeper();
