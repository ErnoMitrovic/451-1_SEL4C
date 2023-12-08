#!/bin/bash

APP_NAME=$1

sudo tee /etc/systemd/system/$APP_NAME.service > /dev/null <<EOL
[Unit]
Description=$APP_NAME App

[Service]
EnvironmentFile=-/etc/default/$APP_NAME
ExecStart=/home/$USER/start.sh
WorkingDirectory=/home/$USER/$APP_NAME
LimitNOFILE=4096
IgnoreSIGPIPE=false
KillMode=process
User=$USER

[Install]
WantedBy=multi-user.target
EOL

# Start config nvm
sudo tee ./start.sh > /dev/null <<EOL
#!/bin/bash
. /home/$USER/.nvm/nvm.sh
cd $APP_NAME
yarn start
EOL

sudo systemctl enable $APP_NAME
sudo systemctl start $APP_NAME
