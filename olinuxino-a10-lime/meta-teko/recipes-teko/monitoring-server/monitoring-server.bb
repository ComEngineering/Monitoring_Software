DESCRIPTION = "Recipe for deploing web interface for monitoring"
HOMEPAGE = "http://www.teko.com/"
SECTION = "teko"
PRIORITY = "optional"
LICENSE = "MIT"
PR = "r0"
 
SRCREV = "cf25d9f4cda8b9d8a941a13a22896b40aed79131"
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
    install -d ${D}/${MONITORING_DIR}/public/stylesheets/flat/   
    install -d ${D}/${MONITORING_DIR}/public/stylesheets/futurico/
    install -d ${D}/${MONITORING_DIR}/public/stylesheets/line/
    install -d ${D}/${MONITORING_DIR}/public/stylesheets/minimal/
    install -d ${D}/${MONITORING_DIR}/public/stylesheets/polaris/
    install -d ${D}/${MONITORING_DIR}/public/stylesheets/square/
    install -d ${D}/${MONITORING_DIR}/public/${BOOTSTRAP}/
    install -d ${D}/${MONITORING_DIR}/public/${BOOTSTRAP}/css/
    install -d ${D}/${MONITORING_DIR}/public/${BOOTSTRAP}/js/
    install -d ${D}/${MONITORING_DIR}/public/${BOOTSTRAP}/fonts/
    install -d ${D}/${MONITORING_DIR}/routes/
    install -d ${D}/${MONITORING_DIR}/views/
    install -d ${D}/${MONITORING_DIR}/public/fonts/
    install -d ${D}/${MONITORING_DIR}/public/images/
    install -d ${D}/${MONITORING_DIR}/public/images/avatar/
    install -d ${D}/${MONITORING_DIR}/public/images/icons/
    install -d ${D}/${MONITORING_DIR}/public/scripts/
    install -d ${D}/${MONITORING_DIR}/public/scripts/input-mask/
    install -d ${D}/${MONITORING_DIR}/public/scripts/input-mask/phone-codes/

    install -m0644 ${S}/server-application/app.js                      ${D}/${MONITORING_DIR}/app.js
    install -m0644 ${S}/server-application/userBase.js                 ${D}/${MONITORING_DIR}/userBase.js
    install -m0644 ${S}/server-application/package.json                ${D}/${MONITORING_DIR}/package.json
    install -m0644 ${S}/server-application/bin/www                     ${D}/${MONITORING_DIR}/bin/www
    install -m0644 ${S}/server-application/public/stylesheets/*.*      ${D}/${MONITORING_DIR}/public/stylesheets/
    install -m0644 ${S}/server-application/public/stylesheets/flat/*   ${D}/${MONITORING_DIR}/public/stylesheets/flat/  
    install -m0644 ${S}/server-application/public/stylesheets/futurico/*   ${D}/${MONITORING_DIR}/public/stylesheets/futurico/   
    install -m0644 ${S}/server-application/public/stylesheets/line/*   ${D}/${MONITORING_DIR}/public/stylesheets/line/
    install -m0644 ${S}/server-application/public/stylesheets/minimal/*    ${D}/${MONITORING_DIR}/public/stylesheets/minimal/   
    install -m0644 ${S}/server-application/public/stylesheets/polaris/*    ${D}/${MONITORING_DIR}/public/stylesheets/polaris/  
    install -m0644 ${S}/server-application/public/stylesheets/square/*     ${D}/${MONITORING_DIR}/public/stylesheets/square/ 
    install -m0644 ${S}/server-application/public/${BOOTSTRAP}/css/*   ${D}/${MONITORING_DIR}/public/${BOOTSTRAP}/css/
    install -m0644 ${S}/server-application/public/${BOOTSTRAP}/js/*    ${D}/${MONITORING_DIR}/public/${BOOTSTRAP}/js/
    install -m0644 ${S}/server-application/public/${BOOTSTRAP}/fonts/* ${D}/${MONITORING_DIR}/public/${BOOTSTRAP}/fonts/
    install -m0644 ${S}/server-application/routes/*                    ${D}/${MONITORING_DIR}/routes/
    install -m0644 ${S}/server-application/public/fonts/*               ${D}/${MONITORING_DIR}/public/fonts/
#    install -m0644 ${S}/server-application/public/images/*.*              ${D}/${MONITORING_DIR}/public/images/
    install -m0644 ${S}/server-application/public/images/avatar/*       ${D}/${MONITORING_DIR}/public/images/avatar/
    install -m0644 ${S}/server-application/public/images/icons/*        ${D}/${MONITORING_DIR}/public/images/icons/
    install -m0644 ${S}/server-application/public/scripts/*.*           ${D}/${MONITORING_DIR}/public/scripts/
    install -m0644 ${S}/server-application/public/scripts/input-mask/*.*  ${D}/${MONITORING_DIR}/public/scripts/input-mask/
    install -m0644 ${S}/server-application/public/scripts/input-mask/phone-codes/*  ${D}/${MONITORING_DIR}/public/scripts/input-mask/phone-codes/
    install -m0644 ${S}/server-application/views/*.*                   ${D}/${MONITORING_DIR}/views/
}
