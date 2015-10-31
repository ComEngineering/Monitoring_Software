#!/bin/sh
# Initializing script for starting TEKO monitoring development.


git clone -b fido git://git.yoctoproject.org/poky.git
cd poky
git clone -b fido https://github.com/linux-sunxi/meta-sunxi.git
git clone https://git.congatec.com/yocto/meta-openembedded.git
git clone https://github.com/imyller/meta-nodejs.git

. ./oe-init-build-env 
MACHINE=olinuxino-a10lime
