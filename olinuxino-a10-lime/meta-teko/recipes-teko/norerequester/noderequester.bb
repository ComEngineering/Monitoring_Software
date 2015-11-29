#
# This file was derived from the 'Hello World!' example recipe in the
# Yocto Project Development Manual.
#

DESCRIPTION = "Modbus parameters requester for teko monitoring project"
SECTION = "teko"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"
PR = "r0"

inherit npm

DEPENDS = "nodejs nodemodbus node-mysql"

SRC_URI = "file://noderequester.js\
file://example.mb_conf.js"

S = "${WORKDIR}"

do_install() {
    install -D -m 0755 ${S}/noderequester.js ${D}${bindir}/noderequester.js
}

FILES_${PN} += "${bindir}/noderequester.js"

# Prevents do_package failures with:
# debugsources.list: No such file or directory:
INHIBIT_PACKAGE_DEBUG_SPLIT = "1"
