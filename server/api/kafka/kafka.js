'use strict';

module.exports = function (zk) {
  return {
    context : {},
    status : "",
    perform_get_on_child: true,
    debug: false,
    data: {},

    callback : function(status, data) {}, //default

    timeout: function() {
      var self = this;
      if (self.status == "pending") {
        self.status = "error";
        self.callback("error", []);
      }
    },

    success: function() {
      var self = this;
      if (self.status == "pending") {
        self.status = "success";
        self.callback("success", self.data);
      }
    },

    setup_async: function(callback) {
      var self = this;
      self.status = "pending";
      self.callback = callback;
      setTimeout(self.timeout, 9000); // in 9s, fail the call
      self.context.browse = {}; //list of traversed nodes
      self.context.get = {};
    },

    cleanup: function() {
      var self = this;
      if (self.status == "error") return false; //stop checking we're too late
      var res_count = 0;
      for (var key in self.context.browse) {
        if (!self.context.browse[key]) res_count++;
      }
      for (var key in self.context.get) {
        if (!self.context.get[key]) res_count++;
      }
      if (res_count == 0) { //done with all children
        self.success();
      }
    },


    set_data: function(path, data) {
      var self = this;
      if (data == null) return false;
      var path_r = path.split("/");
      if (self.debug) console.log(path);
      var temp_data = self.data;
      var prev_temp_data = temp_data;
      var key = path_r[0];
      if (key == '') path_r.splice(0,1);
      while (path_r.length > 0) {
        key = path_r[0];
        if (Object.prototype.toString.call(temp_data[key]) == "[object Undefined]") {
          temp_data[key] = {};
        } else if (Object.prototype.toString.call(temp_data[key]) != "[object Object]") {
          var temp_val = temp_data[key];
          temp_data[key] = {value: temp_val};
        }
        prev_temp_data = temp_data;
        temp_data = temp_data[key];
        path_r.splice(0, 1);
      }
      var data_object = JSON.parse(data);
      if (typeof data_object == "object") {
        for (var sub_key in data_object) {
          prev_temp_data[key][sub_key] = data_object[sub_key];
        }
      } else {
        prev_temp_data[key].value = data_object;
      }
      if (self.debug) console.log(self.data);
    },

    get_path: function(path) {
      var self = this;
      self.context.get[path] = false;
      zk.get(path, false, function (rc, status, stat, data) {
        if (status == "ok") {
          self.set_data(path, data);
        }
        self.context.get[path] = true;
        self.cleanup(); //attempt cleanup & callback
      });
    },

    browse_path: function(path) {
      var self = this;
      self.context.browse[path] = false;
      zk.get_children(path, false, function (rc, err, children) {
        if (children) children.forEach(function(child) {
          self.browse_path(path + "/" + child); //recursion
          if (self.perform_get_on_child) self.get_path(path + "/" + child);
        });
        self.context.browse[path] = true;
        self.cleanup(); //attempt cleanup & callback
      });
    },



    ////////////////////
    get_topics: function(callback) {
      var self = this;
      self.setup_async(callback); //setup async hooks & timeout
      self.browse_path("/brokers/topics");
    },

    get_consumers: function(callback) {
      var self = this;
      self.setup_async(callback);
      self.browse_path("/consumers");
    },

    get_controller: function(callback) {
      var self = this;
      self.setup_async(callback);
      self.get_path("/controller");
    }
  };
};
