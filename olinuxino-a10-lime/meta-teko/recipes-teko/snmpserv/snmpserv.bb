DESCRIPTION = "SNMP server for teko monitoring project"
SECTION = "teko"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"
PR = "r0"

inherit update-rc.d

DEPENDS = "nodejs noderequester node-mysql node-snmpjs"

SRC_URI = "file://snmpserv.js \
           file://snmpserv.sh"

S = "${WORKDIR}"

INITSCRIPT_NAME = "snmpserv.sh"
INITSCRIPT_PARAMS = "defaults 25 79"

SNMPSERV_DIR ?= "/opt/"

do_install() {
    install -d ${D}/${sysconfdir}/init.d/
    install -c -m0755 ${WORKDIR}/${INITSCRIPT_NAME} ${D}/${sysconfdir}/init.d/${INITSCRIPT_NAME}

    install -D -m 0755 ${S}/snmpserv.js ${D}/${SNMPSERV_DIR}/snmpserv.js
}

FILES_${PN} += "${SNMPSERV_DIR}"
