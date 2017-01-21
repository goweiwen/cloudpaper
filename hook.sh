#!/bin/bash

# First, get the zip file
cd /opt/bitnami/apps && wget -O master.zip -q https://github.com/goweiwen/hacknroll2017/archive/master.zip

# Second, unzip it, if the zip file exists
if [ -f /opt/bitnami/apps/master.zip ]; then
    # Unzip the zip file
    unzip -q /opt/bitnami/apps/master.zip

    # Delete zip file
    rm /opt/bitnami/apps/master.zip

    # Rename project directory to desired name
    mv master cloudpaper_new

    # Delete current directory
    rm -rf /opt/bitnami/apps/cloudpaper

    # Rename back to the original name
    mv cloudpaper_new cloudpaper

    # Perhaps call any other scripts you need to rebuild assets here
    # or set owner/permissions
    # or confirm that the old site was replaced correctly
fi
