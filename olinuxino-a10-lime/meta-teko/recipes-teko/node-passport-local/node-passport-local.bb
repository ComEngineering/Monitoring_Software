DESCRIPTION = "Node.js addition module for node passportjs framework"
HOMEPAGE = "http://passportjs.org"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"

inherit npm
DEPENDS = "node-passport"

S = "${WORKDIR}/git"

SRC_URI = "git://github.com/jaredhanson/passport-local.git;branch=master;rev=c5a349b1fce71c51d66f78f8fc3e3861444b9a04"

do_install () {
    export npm_config_prefix=${D}${prefix}
    export TMPDIR=${T}
    npm install -g
}

FILES_${PN} += "${libdir}/node_modules/passport-local/"
FILES_${PN} += "/usr/etc/"
FILES_${PN} += "/usr/"

RDEPENDS_${PN} += "perl"

# Prevents do_package failures with:
# debugsources.list: No such file or directory:
INHIBIT_PACKAGE_DEBUG_SPLIT = "1"