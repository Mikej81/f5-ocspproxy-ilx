# f5-ocspproxy-ilx
F5 ILX OCSP Proxy

Import workspace, use release tgz not git zip.
For later versions of TMOS, you may have to delete /var/ilx/workspaces/Common/f5ocspproxy/extensions/f5-ocspproxy-ext/node_modules/.bin/shjs and mkdirp as symbolic links are not allowed. You may also encounter permission issues trying to import the workspace. If so manually copy the workspace to /var/ilx/workspaces/Common/f5ocspproxy/ and reset the permissions.

--Reset perms
mount -o remount,ro /usr
chown -R root:sdm /var/ilx/workspaces/Common/f5ocspproxy/
chmod -R g+w /var/ilx/workspaces/Common/f5ocspproxy/

--Remove symlinks
cd /var/ilx/workspaces/Common/f5ocspproxy/extensions/f5-ocspproxy-ext/node_modules/
npm remove shjs
npm remove mkdirp
rm /var/ilx/workspaces/Common/f5ocspproxy/extensions/f5-ocspproxy-ext/node_modules/.bin/shjs
rm /var/ilx/workspaces/Common/f5ocspproxy/extensions/f5-ocspproxy-ext/node_modules/.bin/mkdirp
npm install mkdirp --no-bin-links
npm install shjs --no-bin-links

--Update package.json
Modify the package.json for f5-nodejs to "1.0.0"

--update npm packages
cd /var/ilx/workspaces/Common/f5ocspproxy/extensions/f5-ocspproxy-ext/node_modules/
npm install
npm update

Create / link plugin.
--Modify plugin
Set the concurrency mode of the plugin to Single.
To enable debugging: Command Arguments --debug; iRules LX Logging "check"; Trace Level 60; Log Publisher: "local-db-publisher"

Ensure the plugin is running
-- Statistics >> Module Statistics: Local Traffic >> iRules LX : Statistics Type: iRules LX. Ensure the Status is "Running".


Create VS with Source Address Translation set to "None", listening on 8000. If port 8000 is in use, you can configure another port to listen on like 3000.

attach / create irule:

when CLIENT_ACCEPTED {
    node 127.0.0.1
}

To convert CRL's for use, from CLI:  
cd /var/ilx/workspaces/Common/f5ocspproxy/extensions/f5-ocspproxy-ext/node_modules/
node buildjson.js

Or setup a cron to look for new CRL's to convert to json.

- buildjson.js will convert all CRL under ./crl to json.

Win.
