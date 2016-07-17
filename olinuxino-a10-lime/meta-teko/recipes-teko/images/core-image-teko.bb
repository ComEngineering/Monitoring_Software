SUMMARY = "Image for teko monitoring project."

IMAGE_INSTALL = "packagegroup-core-boot \
libmodbus \
nodejs \
nodemodbus \
node-mysql \
node-dbus \
mariadb \
cronie \
openssh-sshd \
serve-favicon \
monitoring-server \
express \
node-passport \
node-passport-local \
node-connect-flash \
node-socket-io \
node-i18n \
noderequester \
${ROOTFS_PKGMANAGE_BOOTSTRAP} ${CORE_IMAGE_EXTRA_INSTALL}"

IMAGE_LINGUAS = " "

LICENSE = "MIT"

inherit core-image

IMAGE_ROOTFS_SIZE ?= "8192"

