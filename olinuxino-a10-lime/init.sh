#!/bin/sh
# Initializing script for starting TEKO monitoring development.

if [ ! -d "./poky" ]; then
  git clone -b fido git://git.yoctoproject.org/poky.git
fi

cd poky

if [ ! -d "./meta-sunxi" ]; then
  git clone -b fido https://github.com/linux-sunxi/meta-sunxi.git
fi

if [ ! -d "./meta-openembedded" ]; then
  git clone https://git.congatec.com/yocto/meta-openembedded.git
fi

if [ ! -d "./meta-nodejs" ]; then
  git clone https://github.com/imyller/meta-nodejs.git
fi

cp ./../meta-teko/.templateconf.sample ./.templateconf
. ./oe-init-build-env 

echo "**********************************************************"
echo "*   For building TEKO image -> bitbake core-image-teko   *"
echo "**********************************************************"
