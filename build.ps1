$user = "agenciaboz"
$subdomain = "app.agenciaboz.com.br"
$path = "/home/$user/$subdomain"

npx vite build
Write-Output 'Uploading build to server'
scp -r -P 22022 dist/* agenciaboz:$path
ssh -p 22022 agenciaboz "chown -R $user`:$user $path/*"
