DESCRIPTION = "Node.js Flash message middleware for Connect and Express."
HOMEPAGE = "http://expressjs.org"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"

inherit npm
DEPENDS = "nodejs-native nodejs"

S = "${WORKDIR}/git"

SRC_URI = "git://github.com/jaredhanson/connect-flash.git;protocol=git;branch=master;rev=702d7ad99c95c539531056fe31d8cda7d5906a9b"

do_compile_prepend () {
    rm ${WORKDIR}/git/Makefile
}

do_install () {
    export npm_config_prefix=${D}${prefix}
    export TMPDIR=${T}
    rm -f ${WORKDIR}/git/Makefile
    npm install -g
}

FILES_${PN} += "${libdir}/node_modules/connect-flash/"
FILES_${PN} += "/usr/etc/"
FILES_${PN} += "/usr/"

RDEPENDS_${PN} += "perl"

# Prevents do_package failures with:
# debugsources.list: No such file or directory:
INHIBIT_PACKAGE_DEBUG_SPLIT = "1"