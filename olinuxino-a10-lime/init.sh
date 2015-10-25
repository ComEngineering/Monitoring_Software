#!/bin/sh
# Initializing script for starting TEKO monitoring development.


git clone -b fido git://git.yoctoproject.org/poky.git
cd poky
git clone -b fido https://github.com/linux-sunxi/meta-sunxi.git

#MACHINE=olinuxino-a10lime
hob
