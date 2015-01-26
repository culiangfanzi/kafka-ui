'use strict';

var express = require('express');
var kafka = require('./kafka');
var zookeeper = require('../../config/zookeeper');

var router = express.Router();

router.get('/', function(req, res) {
  res.json({ data: [] });
});


router.get('/consumers', function(req, res) {
  var k = new kafka(zookeeper.zk);
  k.get_consumers(function(result, data) {
    if (result == "success") {
      res.json({ status : "success" , data: data});
    } else {
      res.json({ status : "error" });
    }
  });
});

router.get('/topics', function(req, res) {
  var k = new kafka(zookeeper.zk);
  k.get_topics(function(result, data) {
    if (result == "success") {
      res.json({ status : "success" , data: data});
    } else {
      res.json({ status : "error" });
    }
  });
});

router.get('/controller', function(req, res) {
  var k = new kafka(zookeeper.zk);
  k.get_controller(function(result, data) {
    if (result == "success") {
      res.json({ status : "success" , data: data});
    } else {
      res.json({ status : "error" });
    }
  });
});



//
//router.get('/topics',
//  function(req, res) {
//    zookeeper.getTopics(function(data) {
//      res.json({ results : data });
//    });
//  }
//);
//
//router.get('/topic/:name',
//  function(req, res) {
//    zookeeper.getTopicInfo(req.param('name'), function(data) {
//      res.json({ results: data });
//    });
//    //zookeeper.getTopics(function(data) {
//    //  res.json({ results : data });
//    //});
//  }
//);
//
//router.get('/topic/:name/partitions',
//  function(req, res) {
//    zookeeper.getTopicPartitions(req.param('name'), function(data) {
//      res.json({ results: data });
//    });
//  }
//);
//
//router.get('/topic/:name/partitions/:partitionid',
//  function(req, res) {
//    console.log('partitions');
//    zookeeper.getTopicPartitionInfo(req.param('name'), req.param('partitionid'), function(data) {
//      res.json({ results: data });
//    });
//  }
//);


module.exports = router;
