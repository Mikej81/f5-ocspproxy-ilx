var fs = require('fs');
var shell = require('shelljs');
var JsonDB = require('node-json-db');

const caFolder = './ca/crl/';

fs.readdir(caFolder, (err, files) => {
  const crlFiles = files.filter(el => /\.crl$/.test(el))
  crlFiles.forEach(file => {
    var tmp = ''
    var crl = shell.exec('openssl crl -inform der -text -noout -in ' + caFolder + file + ' | grep -e keyid -e Serial | sed \'/keyid:/s/://g\' | sed \'s/keyid/"keyid" : "/g\' | sed \'/keyid/s/$/", "certs":  [/\' | sed \'/Serial/s/$/",/\' | sed \'s/Serial Number:/serial : "/g\' | sed \'s/^[ \t]*//;s/[ \t]*$//\' | sed \'s/serial : " /serial "/g\' | sed \'$ s/$/]}/\' | sed \'s/"keyid" :/{"issuer":/g\' | sed \'s/serial//g\' | tr -d \'\n\'', {silent:true}).stdout;
    try {
      if (crl.endsWith(',]}')) {
        crl = crl.replace(',]}', ']}')
      }
      if (crl != '') {
      tmp = JSON.parse(crl)
      var issuerID = tmp.issuer;
      var certID = tmp.certs || '';
    var db = new JsonDB(caFolder + issuerID, true, false);
      db.push(issuerID, {certs: certID}, false);
    } else {
      console.log('ERROR IMPORTING ' + file + ' / ' + issuerID + ' CONTINUING')
      //remove file if error, but also find why the crl errors...
      //IF a file was written...
    }

    } catch(err) {
      console.log(file)
      console.log('dang ole err: ' + err)
      console.log('crl' + crl + '//');
    }
  });
})

