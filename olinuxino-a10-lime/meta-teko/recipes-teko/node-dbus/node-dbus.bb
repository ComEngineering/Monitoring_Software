DESCRIPTION = "Node.js dbus lib"
HOMEPAGE = "https://github.com/sidorares/node-dbus"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"

inherit npm
DEPENDS = "nodejs-native nodejs"

S = "${WORKDIR}/git"

SRC_URI = "git://github.com/sidorares/node-dbus;protocol=git;branch=master;rev=516bf5337b6d1df0193607af8e8e42f33600fa85"

INSANE_SKIP_${PN} = "arch"

do_install () {
    export LD="${CXX}"
    export GYP_DEFINES="sysroot=${STAGING_DIR_HOST}"

    export npm_config_arch=${TARGET_ARCH}
    export npm_config_prefix=${D}${prefix}
    export TMPDIR=${T}
    npm install -g
}

FILES_${PN} += "${libdir}/node_modules/dbus/"
FILES_${PN} += "/usr/etc/"
FILES_${PN} += "/usr/"

RDEPENDS_${PN} += "perl"

# Prevents do_package failures with:
# debugsources.list: No such file or directory:
INHIBIT_PACKAGE_DEBUG_SPLIT = "1"