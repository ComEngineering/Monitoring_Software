#!/bin/sh
# Initializing script for starting TEKO monitoring development.

repo init -u https://github.com/Freescale/fsl-community-bsp-platform -b daisy
repo sync
MACHINE=imx233-olinuxino-maxi . ./setup-environment build
bitbake -c fetchall core-image-base

mkdir ./sources/meta-teko
git clone https://github.com/imyller/meta-nodejs.git ./sources/meta-teko/
echo 'meta-nodejs,git://github.com/imyller/meta-nodejs.git,master,HEAD' > ./sources/layers.txt