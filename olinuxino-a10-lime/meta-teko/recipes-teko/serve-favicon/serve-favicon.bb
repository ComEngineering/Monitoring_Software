DESCRIPTION = "Node.js serve-favicon framework"
HOMEPAGE = "http://expressjs.com/"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"

inherit npm
DEPENDS = "nodejs-native nodejs"

S = "${WORKDIR}/git"

SRC_URI = "git://github.com/expressjs/serve-favicon.git;protocol=git;branch=master;rev=8be7f2fd0ea7e17ae6735f8247694276b3766fda"

do_install () {
    export npm_config_prefix=${D}${prefix}
    export TMPDIR=${T}
    npm install -g
}

FILES_${PN} += "${libdir}/node_modules/serve-favicon/"
FILES_${PN} += "/usr/etc/"
FILES_${PN} += "/usr/"

RDEPENDS_${PN} += "perl"

# Prevents do_package failures with:
# debugsources.list: No such file or directory:
INHIBIT_PACKAGE_DEBUG_SPLIT = "1"