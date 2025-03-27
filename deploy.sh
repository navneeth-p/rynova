#!/bin/bash
# Automated deployment script for Rynova/Rynovatrade website

echo "===== Starting Deployment Process ====="
echo "$(date)"

# Verify that files were uploaded
if [ ! "$(ls -A /home/ubuntu/temp_upload)" ]; then
    echo "Error: No files were uploaded to the temp directory!"
    exit 1
fi

# Create necessary directories in destination
echo "Creating necessary directories..."
mkdir -p /home/ubuntu/rynovatrade/dist/assets
mkdir -p /home/ubuntu/rynovatrade/dist/images/products

# Backup current site (optional)
echo "Creating backup of current site..."
BACKUP_DIR="/home/ubuntu/backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p $BACKUP_DIR
if [ -d "/home/ubuntu/rynovatrade/dist" ]; then
    cp -r /home/ubuntu/rynovatrade/dist/* $BACKUP_DIR 2>/dev/null || :
    echo "Backup created at $BACKUP_DIR"
else
    echo "No existing files to backup"
fi

# Deploy new files
echo "Deploying new files..."
rm -rf /home/ubuntu/rynovatrade/dist/*
cp -r /home/ubuntu/temp_upload/* /home/ubuntu/rynovatrade/dist/

# Set production permissions
echo "Setting production permissions..."
chown -R www-data:www-data /home/ubuntu/rynovatrade/dist
chmod -R 755 /home/ubuntu/rynovatrade/dist
find /home/ubuntu/rynovatrade/dist -type f -exec chmod 644 {} \;

# Restart Nginx
echo "Restarting Nginx..."
sudo systemctl restart nginx

# Clean up
echo "Cleaning up..."
rm -rf /home/ubuntu/temp_upload

echo "===== Deployment Complete ====="
echo "Website should now be live at https://rynovatrade.com"
echo "If you encounter any issues, you can restore from backup at $BACKUP_DIR" 