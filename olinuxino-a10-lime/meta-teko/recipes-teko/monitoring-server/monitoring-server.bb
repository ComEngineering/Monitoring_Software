DESCRIPTION = "Recipe for deploing web interface for monitoring"
HOMEPAGE = "http://www.teko.com/"
SECTION = "teko"
PRIORITY = "optional"
LICENSE = "MIT"
PR = "r0"
 
SRCREV = "cf103eda19e3449422094428f0ac89a01976fb79"
SRC_URI = "git://github.com/TECOLTD/Monitoring_WEB.git;protocol=git;branch=master \
           file://web-monitoring.sh \
     "
S = "${WORKDIR}/git"
 
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"

INITSCRIPT_NAME = "web-monitoring.sh"
INITSCRIPT_PARAMS = "defaults 24 76"

inherit update-rc.d

MONITORING_DIR ?= "usr/web-monitoring"
BOOTSTRAP = "bootstrap-3.3.6-dist"

FILES_${PN} += "${MONITORING_DIR}"

do_install() {
    install -d ${D}/${sysconfdir}/init.d/
    install -c -m0755 ${WORKDIR}/${INITSCRIPT_NAME}             ${D}/${sysconfdir}/init.d/${INITSCRIPT_NAME}

    install -d ${D}/usr/
    install -d ${D}/${MONITORING_DIR}/
    install -d ${D}/${MONITORING_DIR}/bin/
    install -d ${D}/${MONITORING_DIR}/public/
    install -d ${D}/${MONITORING_DIR}/public/stylesheets/
    install -d ${D}/${MONITORING_DIR}/public/${BOOTSTRAP}/
    install -d ${D}/${MONITORING_DIR}/public/${BOOTSTRAP}/css/
    install -d ${D}/${MONITORING_DIR}/public/${BOOTSTRAP}/js/
    install -d ${D}/${MONITORING_DIR}/public/${BOOTSTRAP}/fonts/
    install -d ${D}/${MONITORING_DIR}/routes/
    install -d ${D}/${MONITORING_DIR}/views/

    install -m0644 ${S}/server-application/app.js                      ${D}/${MONITORING_DIR}/app.js
    install -m0644 ${S}/server-application/userBase.js                 ${D}/${MONITORING_DIR}/userBase.js
    install -m0644 ${S}/server-application/package.json                ${D}/${MONITORING_DIR}/package.json
    install -m0644 ${S}/server-application/bin/www                     ${D}/${MONITORING_DIR}/bin/www
    install -m0644 ${S}/server-application/public/stylesheets/*        ${D}/${MONITORING_DIR}/public/stylesheets/
    install -m0644 ${S}/server-application/public/${BOOTSTRAP}/css/*   ${D}/${MONITORING_DIR}/public/${BOOTSTRAP}/css/
    install -m0644 ${S}/server-application/public/${BOOTSTRAP}/js/*    ${D}/${MONITORING_DIR}/public/${BOOTSTRAP}/js/
    install -m0644 ${S}/server-application/public/${BOOTSTRAP}/fonts/* ${D}/${MONITORING_DIR}/public/${BOOTSTRAP}/fonts/
    install -m0644 ${S}/server-application/routes/*                    ${D}/${MONITORING_DIR}/routes/
    install -m0644 ${S}/server-application/views/*                     ${D}/${MONITORING_DIR}/views/
}
