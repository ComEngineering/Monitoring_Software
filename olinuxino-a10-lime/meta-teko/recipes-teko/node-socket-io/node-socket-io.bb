DESCRIPTION = "Realtime application framework (Node.JS server)"
HOMEPAGE = "http://socket.io"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"

inherit npm
DEPENDS = "nodejs-native nodejs"

S = "${WORKDIR}/git"

SRC_URI = "git://github.com/socketio/socket.io.git;protocol=git;branch=master;rev=b3fc530abefd384b3a89ff5493e97f3ef85098d4"

do_compile_prepend () {
    rm -f ${WORKDIR}/git/Makefile
}

do_install () {
    export npm_config_prefix=${D}${prefix}
    export TMPDIR=${T}
    npm install -g
}

FILES_${PN} += "${libdir}/node_modules/socket.io/"
FILES_${PN} += "/usr/etc/"
FILES_${PN} += "/usr/"

RDEPENDS_${PN} += "perl"

# Prevents do_package failures with:
# debugsources.list: No such file or directory:
INHIBIT_PACKAGE_DEBUG_SPLIT = "1"