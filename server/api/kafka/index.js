'use strict';

var express = require('express');
var zookeeper = require('../../config/zookeeper');

var router = express.Router();

router.get('/', function(req, res) {
  res.json({ data: [] });
});

router.get('/raw', function(req, res) {
  zookeeper.rawGetChildren(req.param('path'), function(data) {
    res.json({ results : data });
  });
});

router.get('/rawget', function(req, res) {
  zookeeper.rawGet(req.param('path'), function(data) {
    res.json({ results : data });
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
