"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _getUserId = require("../utils/getUserId");

var _getUserId2 = _interopRequireDefault(_getUserId);

var _generateToken = require("../utils/generateToken");

var _generateToken2 = _interopRequireDefault(_generateToken);

var _hashPassword = require("../utils/hashPassword");

var _hashPassword2 = _interopRequireDefault(_hashPassword);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Mutation = {
  login: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref, _ref2, info) {
      var _ref$data = _ref.data,
          email = _ref$data.email,
          password = _ref$data.password;
      var prisma = _ref2.prisma;
      var user, passMatched;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return prisma.query.user({ where: { email: email } });

            case 2:
              user = _context.sent;

              if (user) {
                _context.next = 5;
                break;
              }

              throw new Error("No user found");

            case 5:
              _context.next = 7;
              return _bcryptjs2.default.compare(password, user.password);

            case 7:
              passMatched = _context.sent;

              if (passMatched) {
                _context.next = 10;
                break;
              }

              throw new Error("Invalid credentialds");

            case 10:
              return _context.abrupt("return", {
                user: user,
                token: (0, _generateToken2.default)(user.id)
              });

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function login(_x, _x2, _x3, _x4) {
      return _ref3.apply(this, arguments);
    }

    return login;
  }(),
  createUser: function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, _ref4, _ref5, info) {
      var _ref4$data = _ref4.data,
          name = _ref4$data.name,
          email = _ref4$data.email,
          password = _ref4$data.password;
      var prisma = _ref5.prisma;
      var emailExist, user;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (0, _hashPassword2.default)(password);

            case 2:
              password = _context2.sent;
              _context2.next = 5;
              return prisma.exists.User({ email: email });

            case 5:
              emailExist = _context2.sent;

              if (!emailExist) {
                _context2.next = 8;
                break;
              }

              throw new Error("This email already exists");

            case 8:
              user = prisma.mutation.createUser({
                data: { email: email, name: name, password: password }
              });
              return _context2.abrupt("return", {
                user: user,
                token: (0, _generateToken2.default)(user.id)
              });

            case 10:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function createUser(_x5, _x6, _x7, _x8) {
      return _ref6.apply(this, arguments);
    }

    return createUser;
  }(),
  deleteUser: function () {
    var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, _ref7, _ref8, info) {
      var prisma = _ref8.prisma,
          request = _ref8.request;
      var userId, userExist;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _objectDestructuringEmpty(_ref7);

              userId = (0, _getUserId2.default)(request);
              _context3.next = 4;
              return prisma.exists.User({ id: userId });

            case 4:
              userExist = _context3.sent;

              if (userExist) {
                _context3.next = 7;
                break;
              }

              throw new Error("User not found");

            case 7:
              return _context3.abrupt("return", prisma.mutation.deleteUser({ where: { id: userId } }, info));

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function deleteUser(_x9, _x10, _x11, _x12) {
      return _ref9.apply(this, arguments);
    }

    return deleteUser;
  }(),
  updateUser: function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(parent, _ref10, _ref11, info) {
      var _ref10$data = _ref10.data,
          name = _ref10$data.name,
          email = _ref10$data.email,
          password = _ref10$data.password;
      var prisma = _ref11.prisma,
          request = _ref11.request;
      var userId, userExist;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              userId = (0, _getUserId2.default)(request);

              if (!(typeof password === "string")) {
                _context4.next = 5;
                break;
              }

              _context4.next = 4;
              return (0, _hashPassword2.default)(password);

            case 4:
              password = _context4.sent;

            case 5:
              _context4.next = 7;
              return prisma.exists.User({ id: userId });

            case 7:
              userExist = _context4.sent;

              if (userExist) {
                _context4.next = 10;
                break;
              }

              throw new Error("User not found");

            case 10:
              return _context4.abrupt("return", prisma.mutation.updateUser({ where: { id: userId }, data: { name: name, email: email, password: password } }, info));

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function updateUser(_x13, _x14, _x15, _x16) {
      return _ref12.apply(this, arguments);
    }

    return updateUser;
  }(),
  createPost: function createPost(parent, _ref13, _ref14, info) {
    var _ref13$data = _ref13.data,
        title = _ref13$data.title,
        body = _ref13$data.body,
        published = _ref13$data.published,
        author = _ref13$data.author;
    var prisma = _ref14.prisma,
        request = _ref14.request;

    var userId = (0, _getUserId2.default)(request);
    return prisma.mutation.createPost({
      data: {
        title: title,
        body: body,
        published: published,
        author: { connect: { id: userId } }
      }
    }, info);
  },
  deletePost: function () {
    var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(parent, _ref15, _ref16, info) {
      var id = _ref15.id;
      var prisma = _ref16.prisma,
          request = _ref16.request;
      var userId, postExist;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              userId = (0, _getUserId2.default)(request);
              _context5.next = 3;
              return prisma.exists.Post({ id: id, author: { id: userId } });

            case 3:
              postExist = _context5.sent;

              if (postExist) {
                _context5.next = 6;
                break;
              }

              throw new Error("Unable to delete post");

            case 6:
              return _context5.abrupt("return", prisma.mutation.deletePost({ where: { id: id } }, info));

            case 7:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function deletePost(_x17, _x18, _x19, _x20) {
      return _ref17.apply(this, arguments);
    }

    return deletePost;
  }(),
  updatePost: function () {
    var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(parent, _ref18, _ref19, info) {
      var id = _ref18.id,
          _ref18$data = _ref18.data,
          title = _ref18$data.title,
          body = _ref18$data.body,
          published = _ref18$data.published;
      var prisma = _ref19.prisma,
          request = _ref19.request;
      var userId, postExist, isPostPublished;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              userId = (0, _getUserId2.default)(request);
              _context6.next = 3;
              return prisma.exists.Post({ id: id, author: { id: userId } });

            case 3:
              postExist = _context6.sent;
              _context6.next = 6;
              return prisma.exists.Post({
                id: id,
                published: true
              });

            case 6:
              isPostPublished = _context6.sent;

              if (!(isPostPublished && !published)) {
                _context6.next = 10;
                break;
              }

              _context6.next = 10;
              return prisma.mutation.deleteManyComments({ where: { post: { id: id } } });

            case 10:
              if (postExist) {
                _context6.next = 12;
                break;
              }

              throw new Error("Post not found");

            case 12:
              return _context6.abrupt("return", prisma.mutation.updatePost({ where: { id: id }, data: { title: title, body: body, published: published } }, info));

            case 13:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function updatePost(_x21, _x22, _x23, _x24) {
      return _ref20.apply(this, arguments);
    }

    return updatePost;
  }(),
  createComment: function () {
    var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(parent, _ref21, _ref22, info) {
      var _ref21$data = _ref21.data,
          text = _ref21$data.text,
          author = _ref21$data.author,
          post = _ref21$data.post;
      var prisma = _ref22.prisma,
          request = _ref22.request;
      var userId, isPostPublished;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              userId = (0, _getUserId2.default)(request);
              _context7.next = 3;
              return prisma.exists.Post({
                id: post,
                published: true
              });

            case 3:
              isPostPublished = _context7.sent;

              if (isPostPublished) {
                _context7.next = 6;
                break;
              }

              throw new Error("You doesn't comment in unpublished post");

            case 6:
              return _context7.abrupt("return", prisma.mutation.createComment({
                data: {
                  text: text,
                  author: { connect: { id: userId } },
                  post: { connect: { id: post } }
                }
              }, info));

            case 7:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function createComment(_x25, _x26, _x27, _x28) {
      return _ref23.apply(this, arguments);
    }

    return createComment;
  }(),
  deleteComment: function () {
    var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(parent, _ref24, _ref25, info) {
      var id = _ref24.id;
      var prisma = _ref25.prisma,
          request = _ref25.request;
      var userId, commentExist;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              userId = (0, _getUserId2.default)(request);
              _context8.next = 3;
              return prisma.exists.Comment({
                id: id,
                author: { id: userId }
              });

            case 3:
              commentExist = _context8.sent;

              if (commentExist) {
                _context8.next = 6;
                break;
              }

              throw new Error("Unable to delete comment");

            case 6:
              return _context8.abrupt("return", prisma.mutation.deleteComment({ where: { id: id } }, info));

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function deleteComment(_x29, _x30, _x31, _x32) {
      return _ref26.apply(this, arguments);
    }

    return deleteComment;
  }(),
  updateComment: function () {
    var _ref29 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(parent, _ref27, _ref28, info) {
      var id = _ref27.id,
          text = _ref27.text;
      var prisma = _ref28.prisma,
          request = _ref28.request;
      var userId, commentExist;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              userId = (0, _getUserId2.default)(request);
              _context9.next = 3;
              return prisma.exists.Comment({
                id: id,
                author: { id: userId }
              });

            case 3:
              commentExist = _context9.sent;

              if (commentExist) {
                _context9.next = 6;
                break;
              }

              throw new Error("Unable to update comment");

            case 6:
              return _context9.abrupt("return", prisma.mutation.updateComment({ where: { id: id }, data: { text: text } }, info));

            case 7:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function updateComment(_x33, _x34, _x35, _x36) {
      return _ref29.apply(this, arguments);
    }

    return updateComment;
  }()
};

exports.default = Mutation;