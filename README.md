# f5-ocspproxy-ilx
F5 ILX OCSP Proxy

Import workspace, use release tgz not git zip.
For later versions of TMOS, you may have to delete /var/ilx/workspaces/Common/f5ocspproxy/extensions/f5-ocspproxy-ext/node_modules/.bin/shjs and mkdirp as symbolic links are not allowed. You may also encounter permission issues trying to import the workspace. If so manually copy the workspace to /var/ilx/workspaces/Common/f5ocspproxy/ and reset the permissions.

--Reset perms <br>
mount -o remount,ro /usr <br>
chown -R root:sdm /var/ilx/workspaces/Common/f5ocspproxy/ <br>
chmod -R g+w /var/ilx/workspaces/Common/f5ocspproxy/ <br>

--Remove symlinks <br>
cd /var/ilx/workspaces/Common/f5ocspproxy/extensions/f5-ocspproxy-ext/node_modules/ <br>
npm remove shjs <br>
npm remove mkdirp <br>
rm /var/ilx/workspaces/Common/f5ocspproxy/extensions/f5-ocspproxy-ext/node_modules/.bin/shjs <br>
rm /var/ilx/workspaces/Common/f5ocspproxy/extensions/f5-ocspproxy-ext/node_modules/.bin/mkdirp <br>
npm install mkdirp --no-bin-links <br>
npm install shjs --no-bin-links <br>

--Update package.json <br>
Modify the package.json for f5-nodejs to "1.0.0" <br>

--update npm packages <br>
cd /var/ilx/workspaces/Common/f5ocspproxy/extensions/f5-ocspproxy-ext/node_modules/ <br>
npm install <br>
npm update <br>

Create / link plugin. <br>
--Modify plugin <br>
Set the concurrency mode of the plugin to Single. <br>
To enable debugging: Command Arguments --debug; iRules LX Logging "check"; Trace Level 60; Log Publisher: "local-db-publisher" <br>

Ensure the plugin is running <br>
-- Statistics >> Module Statistics: Local Traffic >> iRules LX : Statistics Type: iRules LX. Ensure the Status is "Running". <br>


Create VS with Source Address Translation set to "None", listening on 8000. If port 8000 is in use, you can configure another port to listen on like 3000. <br>

attach / create irule: <br>

when CLIENT_ACCEPTED {
    node 127.0.0.1
}

To convert CRL's for use, from CLI:   <br>
cd /var/ilx/workspaces/Common/f5ocspproxy/extensions/f5-ocspproxy-ext/node_modules/ <br>
node buildjson.js <br>

Or setup a cron to look for new CRL's to convert to json.

- buildjson.js will convert all CRL under ./crl to json.

Win.
