SUMMARY = "Image for teko monitoring project."

IMAGE_INSTALL = "packagegroup-core-boot \
libmodbus \
nodejs \
nodemodbus \
node-mysql \
node-snmpjs \
node-dbus \
mariadb \
noderequester \
dbus \
cronie \
openssh-sshd \
${ROOTFS_PKGMANAGE_BOOTSTRAP} ${CORE_IMAGE_EXTRA_INSTALL}"

IMAGE_LINGUAS = " "

LICENSE = "MIT"

inherit core-image

IMAGE_ROOTFS_SIZE ?= "8192"

