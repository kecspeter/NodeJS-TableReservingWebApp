var renderMW = require('../middlewares/generic/renderMW');
var mainRedirectMW = require('../middlewares/generic/mainRedirectMW');
var activeModelMW = require('../middlewares/generic/activeModelMW');
//var requireOption = require('../middlewares/requireOption');


var getCsapatokMW = require('../middlewares/csapat/getCsapatokMW');
var getCsapatMW = require('../middlewares/csapat/getCsapatMW');
var delCsapatMW = require('../middlewares/csapat/delCsapatMW');
var saveCsapatMW = require('../middlewares/csapat/saveCsapatMW');
var updateCsapatMW = require('../middlewares/csapat/updateCsapatMW');


var getIdopontokMW = require('../middlewares/idopont/getIdopontokMW');
var delIdopontMW = require('../middlewares/idopont/delIdopontMW');
var saveIdopontMW = require('../middlewares/idopont/saveIdopontMW');

var csapatModel = require('../models/csapat');
var idopontModel = require('../models/idopont');


module.exports = function (app) {
  var objectRepository = {
    csapatModel: csapatModel,
    idopontModel: idopontModel,
    csapat: Boolean,
    title: String,
    foundCsapat: csapatModel,
    foundIdopont: idopontModel
  };

  //adding test objects to the DB
  /*
  let csapat1 = new csapatModel();
  csapat1.name = "DBtest5";
  csapat1.size = 21;
  csapat1.maxlvl = 2;
  csapat1.save((err)=>{});
  
  let idopont1 = new idopontModel();
  idopont1.reservedDate = new Date(2022,03,02);
  idopont1.startTime = new Date(2022,03,01,17,00);
  idopont1.endTime = new Date(2022,03,01,20,00);
  idopont1.tablenum = 2;
  idopont1.teamid = csapat1;
  idopont1.save((err)=>{}); */

  app.get('/',
    activeModelMW(objectRepository, 1),
    mainRedirectMW(objectRepository)
  );


  /**
   * List all teams
   */
  app.get('/csapatok',
    activeModelMW(objectRepository, 1),
    getCsapatokMW(objectRepository),
    renderMW(objectRepository, 'csapatok', "Csapatok")
  );

  /**
  * Create new team
  */
  app.use('/csapat/new',
    activeModelMW(objectRepository, 1),
    saveCsapatMW(objectRepository),
    renderMW(objectRepository, 'csapat_hozzaadasa', "Csapat hozzáadása")
  );

  /**
  * Edit the team details
  */
  app.use('/csapat/:csapatid/edit',
    activeModelMW(objectRepository, 1),
    getCsapatMW(objectRepository),
    updateCsapatMW(objectRepository),
    renderMW(objectRepository, 'csapat_modositasa', "Csapat módosítása")
  );

  /**
  * Delete team (then redirects to /csapatok)
  */
  app.use('/csapat/:csapatid/delete',
    activeModelMW(objectRepository, 1),
    getCsapatMW(objectRepository),
    delCsapatMW(objectRepository),
    renderMW(objectRepository, 'csapat_torolve', "Csapat törölve")
  );




  /**
   * List all apointments
   */
  app.get('/idopontok',
    activeModelMW(objectRepository, 0),
    getCsapatokMW(objectRepository),
    getIdopontokMW(objectRepository),
    renderMW(objectRepository, 'idopontok', "Időpontok")
  );

  /**
  * Create new apointment
  */
  app.use('/idopont/new',
    activeModelMW(objectRepository, 0),
    getCsapatokMW(objectRepository),
    saveIdopontMW(objectRepository),
    renderMW(objectRepository, 'idopont_hozzaadasa', "Új időpont")
  );

  /**
  * Delete idopont (then redirects to /idopontok)
  */
  app.use('/idopont/:idopontid/delete',
    activeModelMW(objectRepository, 0),
    delIdopontMW(objectRepository)
    
  );

};
