DESCRIPTION = "Node.js snmp lib"
HOMEPAGE = "https://github.com/joyent/node-snmpjs"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"

inherit npm
DEPENDS = "nodejs-native nodejs"

S = "${WORKDIR}/git"

SRC_URI = "git://github.com/joyent/node-snmpjs;protocol=git;branch=master;rev=c4a77ef8556c47bfd35cb02a5c9d4876c117d99f"

do_install () {
    export npm_config_prefix=${D}${prefix}
    export TMPDIR=${T}
    npm install -g
    #install -D -m 0755 ${S}/agent.js ${D}${libdir}/node_modules/snmpjs/agent.js
}

FILES_${PN} += "${libdir}/node_modules/snmpjs/"
FILES_${PN} += "/usr/etc/"
FILES_${PN} += "/usr/"

RDEPENDS_${PN} += "perl"

# Prevents do_package failures with:
# debugsources.list: No such file or directory:
INHIBIT_PACKAGE_DEBUG_SPLIT = "1"