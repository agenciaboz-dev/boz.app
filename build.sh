#!/bin/bash

user="agencyboz.com"
subdomain="app.agencyboz.com"
path="/home/${user}/${subdomain}"

npx vite build
echo 'Uploading build to server'
scp -r dist/* root@agencyboz:${path}
# ssh -p 22022 agenciaboz "chown -R ${user}:${user} ${path}/*"
