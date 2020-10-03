"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getUserId = require("../utils/getUserId");

var _getUserId2 = _interopRequireDefault(_getUserId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Subscription = {
  count: {
    subscribe: function subscribe(parent, args, _ref, info) {
      var pubsub = _ref.pubsub;

      var count = 0;

      setInterval(function () {
        count++;
        pubsub.publish("count", { count: count });
      }, 2000);

      return pubsub.asyncIterator("count");
    }
  },

  myPost: {
    subscribe: function subscribe(parent, _ref2, _ref3, info) {
      var postId = _ref2.postId;
      var prisma = _ref3.prisma,
          request = _ref3.request;

      var userId = (0, _getUserId2.default)(request);
      return prisma.subscription.post({
        where: {
          node: {
            author: {
              id: userId
            }
          }
        }
      }, info);
    }
  },

  comment: {
    subscribe: function subscribe(parent, _ref4, _ref5, info) {
      var postId = _ref4.postId;
      var prisma = _ref5.prisma,
          pubsub = _ref5.pubsub;

      return prisma.subscription.comment({
        where: {
          node: {
            post: {
              id: postId
            }
          }
        }
      }, info);
    }
  },
  post: {
    subscribe: function subscribe(parent, args, _ref6, info) {
      var prisma = _ref6.prisma,
          pubsub = _ref6.pubsub;

      return prisma.subscription.post({
        where: {
          node: {
            published: true
          }
        }
      }, info);
    }
  }
};

exports.default = Subscription;