"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getUserId = require("../utils/getUserId");

var _getUserId2 = _interopRequireDefault(_getUserId);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Query = {
  users: function users(parent, _ref, _ref2, info) {
    var query = _ref.query,
        first = _ref.first,
        skip = _ref.skip,
        orderBy = _ref.orderBy;
    var prisma = _ref2.prisma;

    var optArgs = { first: first, skip: skip, orderBy: orderBy };
    if (query) {
      optArgs.where = {
        name_contains: query
      };
    }
    return prisma.query.users(optArgs, info);
  },
  post: function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref3, _ref4, info) {
      var id = _ref3.id;
      var prisma = _ref4.prisma,
          request = _ref4.request;
      var userId, posts;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              userId = (0, _getUserId2.default)(request, false);
              _context.next = 3;
              return prisma.query.posts({
                where: {
                  id: id,
                  OR: [{
                    published: true
                  }, {
                    author: {
                      id: userId
                    }
                  }]
                }
              }, info);

            case 3:
              posts = _context.sent;

              if (!(posts.length === 0)) {
                _context.next = 6;
                break;
              }

              throw new Error("Post not found");

            case 6:
              return _context.abrupt("return", posts[0]);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function post(_x, _x2, _x3, _x4) {
      return _ref5.apply(this, arguments);
    }

    return post;
  }(),
  posts: function posts(parent, _ref6, _ref7, info) {
    var query = _ref6.query,
        first = _ref6.first,
        skip = _ref6.skip,
        orderBy = _ref6.orderBy;
    var prisma = _ref7.prisma;

    var optArgs = {
      first: first,
      skip: skip,
      orderBy: orderBy,
      where: { published: true }
    };

    if (query) {
      optArgs.where.OR = [{
        title_contains: query
      }, {
        body_contains: query
      }];
    }

    return prisma.query.posts(optArgs, info);
  },
  myPosts: function myPosts(parent, _ref8, _ref9, info) {
    var query = _ref8.query,
        first = _ref8.first,
        skip = _ref8.skip,
        orderBy = _ref8.orderBy;
    var prisma = _ref9.prisma,
        request = _ref9.request;

    var userId = (0, _getUserId2.default)(request);
    var optArgs = {
      first: first,
      skip: skip,
      orderBy: orderBy,
      where: { author: { id: userId } }
    };

    if (query) {
      optArgs.where.OR = [{
        title_contains: query
      }, {
        body_contains: query
      }];
    }

    return prisma.query.posts(optArgs, info);
  },
  comments: function comments(parent, _ref10, _ref11, info) {
    var first = _ref10.first,
        skip = _ref10.skip,
        orderBy = _ref10.orderBy;
    var prisma = _ref11.prisma;

    var optArgs = {
      first: first,
      skip: skip,
      orderBy: orderBy
    };
    return prisma.query.comments(optArgs, info);
  }
};

exports.default = Query;