var expect = require("chai").expect;
var getCsapatokMW = require("../middlewares/csapat/getCsapatokMW");

describe("getCsapatok middleware ", function () {
  it("should return all csapat entry from the DB", function (done) {
    var req = {};
    var res = { locals: {} };
    var fakecsapatModel = {
      find: function (some, cb) {
        cb(undefined, ['csapat1', 'csapat2']);
      },
    };
    getCsapatokMW({
      csapatModel: fakecsapatModel,
    })(req, res, function (err) {
      expect(res.locals.csapatok).to.eql(['csapat1', 'csapat2']);
      expect(err).to.eql(undefined);
      done();
    });
  });

  it("should return error on DB error", function (done) {
    var req = {};
    var res = { locals: {} };
    var fakecsapatModel = {
      find: function (some, cb) {
        cb('DB_error', ['csapat1', 'csapat2']);
      },
    };
    getCsapatokMW({
      csapatModel: fakecsapatModel,
    })(req, res, function (err) {
      expect(err).to.be.eql('DB_error')
      expect(res.locals.csapatok).to.be.eql(undefined);
      done();
    });
  });
});
