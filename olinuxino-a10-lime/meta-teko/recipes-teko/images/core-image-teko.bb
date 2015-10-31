SUMMARY = "Image for teko monitoring project."

IMAGE_INSTALL = "packagegroup-core-boot \
libmodbus \
nodejs \
${ROOTFS_PKGMANAGE_BOOTSTRAP} ${CORE_IMAGE_EXTRA_INSTALL}"

IMAGE_LINGUAS = " "

LICENSE = "MIT"

inherit core-image

IMAGE_ROOTFS_SIZE ?= "8192"

