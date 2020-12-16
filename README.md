# f5-ocspproxy-ilx
F5 ILX OCSP Proxy

Import workspace, use release tgz not git zip.
Create / link plugin.

Create VS, listening on 8000.

attach / create irule:

when CLIENT_ACCEPTED {
    node 127.0.0.1
}

To convert CRL's for use, from CLI:  node buildjson.js
Or setup a cron to look for new CRL's to convert to json.

- buildjson.js will convert all CRL under ./crl to json.

Win.
