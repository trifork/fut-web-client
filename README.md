# About FUT
Fælles Udbredelse af Telemedicin (FUT) is a Danish national healthcare platform aimed for telemedicine use that can host 3rd-party apps.  
The platform offers single sign-on, and a secured HL7 FHIR API that the hosted apps can use to search, access and store information about patients and their data (episodes of care, appointments, etc) and administrative data (organizations, care teams, etc).  
See https://digst.dk/digital-service/digital-velfaerd/telemedicin-kol/faelles-udbud-af-telemedicin-fut

# FUT Web Client
The FUT web client demonstrates ways to interact with FUT services and is not for direct clinical or administrative use.  
The client is intended to showcase how a front-end implementation for the FUT infrastructure could be made

## Demo Instance
A client configured for the Trifork _dev_ environment is hosted at https://client.fut.trifork.com.  
User/password is required to login. Please contact jvi@trifork.com for demo credentials.  
Note: This is a DEV environment with only test data. Unrealistic and possibly invalid and corrupt data may be present.

## Build & Deploy
The client is an Angular app hosted on NGINX in Docker.  
FUT services do not support CORS so NGINX also serves as a reverse proxy.   
Note: The client is neither optimized nor tested on mobile or tablet viewports. 

See [/client/README.md](/client/README.md)
