var expect = require("chai").expect;
var saveCsapatMW = require("../middlewares/csapat/saveCsapatMW");

describe("saveCsapat middleware ", function () {
  it("csapat entry successfully saved in the DB", function (done) {

    class fakecsapatModel
    {
        constructor(){}
        save (cb) {
            cb(null);
          }
    }
    const mw = saveCsapatMW({
      csapatModel: fakecsapatModel
    });

    mw(
      {
        body: {
          name: "testCsapat",
          size: "5",
          maxlvl: "12",
        }
      },
      {
        redirect: (where) => {
          expect(where).to.be.eql("/csapatok");
          done();
        },
      },
      (err) => {}
    );
  });
  
  
  it("should call error func when cant save to DB", function (done) {

    class fakecsapatModel
    {
        constructor(){}
        save (cb) {
            cb('DB_error_happened');
          }
    }
    const mw = saveCsapatMW({
      csapatModel: fakecsapatModel
    });

    mw(
      {
        body: {
          name: "testCsapat",
          size: "5",
          maxlvl: "12",
        }
      },
      {
        redirect: (where) => {
          //expect(where).to.be.eql("/csapatok");
        },
      },
      (err) => {
          expect(err).to.be.eql('DB_error_happened');
          done();
      }
    );
  });
});
