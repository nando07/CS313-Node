const express = require('express');
const path = require('path');
var url = require('url');
const cool = require('cool-ascii-faces');
const PORT = process.env.PORT || 5000;

var app =express()
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
  app.get('/', (req, res) => res.render('pages/index'));
  app.get('/cool', (req, res) => res.send(cool()));
  app.get('/getRate', (req, res) => {
    getFormValues(req, res);
  });
  app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

  function getFormValues(req, res) {
    var reqUrl = url.parse(req.url, true);

    var weight = Number(reqUrl.query.weight);
    var mailOption = reqUrl.query.mailOption;

    calculateRate(res, mailOption, weight);
  }

  function calculateRate(res, option, weight) {

    var total = 0;
    var choice = "";
  
    switch (option) {
      case "letter_s":
      choice = "Letters Stamped";
        total = computeLetterStamped(weight);
        break;
      case "letter_m":
      choice = "Letters Metered";
        total = computeLetterMetered(weight);
        break;
      case "envelope":
      choice = "Large Envelope (Flats)";
        total = computeEnvelopesFlats(weight);
        break;
      case "package":
      choice = "First-Class Package Service—Retail";
        total = computePackageFirstClass(weight);
        break;
    }
    
    var params = {option: choice, weight: weight, total: total};



    if (total > 0) {
    res.render('pages/result', params);
    } else {

      // show error page
      res.render('pages/invalid', params);
    }
  }

  function computeLetterStamped(weight) {

    if (weight <= 1) {
      return 0.50;
    } else if (weight <= 2) {
      return 0.71;
    } else if (weight <= 3) {
      return 0.92;
    } else if (weight <= 3.5) {
      return 1.13;
    } else {
      return 0;
    }
  }
  
  function computeLetterMetered(weight) {
  
    if (weight <= 1) {
      return 0.47;
    } else if (weight <= 2) {
      return 0.68;
    } else if (weight <= 3) {
      return 0.89;
    } else if (weight <= 3.5) {
      return 1.10;
    } else {
      return 0;
    }
  
  }
  
  function computeEnvelopesFlats(weight) {
  
    if (weight <= 1) {
      return 1.00;
    } else if (weight <= 2) {
      return 1.21;
    } else if (weight <= 3) {
      return 1.42;
    } else if (weight <= 4) {
      return 1.63;
    } else if (weight <= 5) {
      return 1.84;
    } else if (weight <= 6) {
      return 2.05;
    } else if (weight <= 7) {
      return 2.26;
    } else if (weight <= 8) {
      return 2.47;
    } else if (weight <= 9) {
      return 2.68;
    } else if (weight <= 10) {
      return 2.89;
    } else if (weight <= 11) {
      return 3.10;
    } else if (weight <= 12) {
      return 3.31;
    } else if (weight <= 13) {
      return 3.52;
    } else {
      return 0;
    }
  }

  function computePackageFirstClass(weight) {
    if (weight <= 4) {
      return 3.5;
    } else if (weight <= 8) {
      return 3.75;
    } else if (weight <= 9) {
      return 4.10;
    } else if (weight <= 10) {
      return 4.45;
    } else if (weight <= 11) {
      return 4.80;
    } else if (weight <= 12) {
      return 5.15;
    } else if (weight <= 13) {
      return 5.50;
    } else {
      return 0;
    }
  }