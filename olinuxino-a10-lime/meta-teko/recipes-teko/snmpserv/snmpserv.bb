DESCRIPTION = "SNMP server for teko monitoring project"
SECTION = "teko"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"
PR = "r0"

inherit npm update-rc.d

DEPENDS = "nodejs noderequester node-mysql node-snmp"

SRC_URI = "file://snmpserv.js \
file://snmpserv.sh"

S = "${WORKDIR}"

INITSCRIPT_NAME = "snmpserv.sh"
INITSCRIPT_PARAMS = "defaults 24 76"

do_install() {
    install -d ${D}/${sysconfdir}/init.d/
    install -c -m0755 ${WORKDIR}/${INITSCRIPT_NAME} ${D}/${sysconfdir}/init.d/${INITSCRIPT_NAME}

    install -D -m 0755 ${S}/snmpserv.js ${D}/opt/snmpserv.js
}

FILES_${PN} += "/opt/snmpserv.js"
FILES_${PN} += "/opt/snmpserv.sh"

# Prevents do_package failures with:
# debugsources.list: No such file or directory:
INHIBIT_PACKAGE_DEBUG_SPLIT = "1"
