DESCRIPTION = "Modbus parameters requester for teko monitoring project"
SECTION = "teko"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"
PR = "r0"

inherit update-rc.d

DEPENDS = "nodejs nodemodbus node-mysql"

SRC_URI = "file://noderequester.js \
           file://example.mb_conf.js \
           file://noderequester.sh \
          "

S = "${WORKDIR}"

INITSCRIPT_NAME = "noderequester.sh"
INITSCRIPT_PARAMS = "defaults 22 78"

NODEREQUESTER_DIR ?= "/opt/"

do_install() {
    install -d ${D}/${sysconfdir}/init.d/
    install -c -m0755 ${WORKDIR}/${INITSCRIPT_NAME} ${D}/${sysconfdir}/init.d/${INITSCRIPT_NAME}

    install -D -m 0755 ${S}/noderequester.js ${D}/${NODEREQUESTER_DIR}/noderequester.js
    install -D -m 0755 ${S}/example.mb_conf.js ${D}/opt/mb_conf.js
}

FILES_${PN} += "${NODEREQUESTER_DIR}"


