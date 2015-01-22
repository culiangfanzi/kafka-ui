var ZooKeeper = require('zookeeper');
//https://github.com/dannycoates/zkjs


var zookeeper = function () {
  return {
    config : function(app) {
      //this.zk = new ZK({
      //  hosts: ['192.168.59.103:49159'],
      //  root: '/',
      //  requestTimeout: 3000
      //});
      this.zk = new ZooKeeper({
        connect: "192.168.59.103:49159"
        ,timeout: 3000
        ,debug_level: ZooKeeper.ZOO_LOG_LEVEL_WARN
        ,host_order_deterministic: false
      });
      this.zk.data_as_buffer = false;
    },

    rawGet : function(path, callback) {
      var _this = this;
      this.zk.connect(function (err) {
        if (!err) _this.zk.a_get(path, null, function (rc, err, stat, data) { callback(data); });
      });
    },
    rawGetChildren : function(path, callback) {
      var _this = this;
      this.zk.connect(function (err) {
        if (!err) _this.zk.a_get_children(path, null, function (rc, err, children) { callback(children); });
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
