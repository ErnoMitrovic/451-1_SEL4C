#!/bin/bash

# Ubuntu 20.04 LTS
# Update the system
sudo apt update
sudo apt upgrade -y

# Install Node.js
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -

# Install Nginx
sudo apt install -y nginx
sudo systemctl status nginx

# Start Nginx and enable it on boot
sudo systemctl start nginx
sudo systemctl enable nginx

# Configure Nginx
sudo tee /etc/nginx/sites-available/myapp.conf > /dev/null <<EOL
server {
    listen 80;
    listen [::]:80;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Additional configuration (if needed)
}
EOL

# Create a symbolic link to enable the site
sudo ln -s /etc/nginx/sites-available/myapp.conf /etc/nginx/sites-enabled/

# Remove default configuration if it exists
sudo rm -f /etc/nginx/sites-enabled/default
sudo rm -f /etc/nginx/sites-available/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx to apply changes
sudo systemctl restart nginx

# Create an environment variable (assuming you are in the project directory)
echo "REACT_APP_API_BASE_URL=" >> .env
