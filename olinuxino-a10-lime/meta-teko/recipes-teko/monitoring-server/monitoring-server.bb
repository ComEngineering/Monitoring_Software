DESCRIPTION = "Recipe for deploing web interface for monitoring"
HOMEPAGE = "http://www.teko.com/"
SECTION = "teko"
PRIORITY = "optional"
LICENSE = "MIT"
PR = "r0"
 
SRC_URI = "git://github.com/TECOLTD/Monitoring_WEB.git;protocol=git;branch=master;rev=45eddfdc2866c6b4824301831e931f735fea91bd \
           file://web-monitoring.sh \
     "
S = "${WORKDIR}/git"
 
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"

INITSCRIPT_NAME = "web-monitoring.sh"
INITSCRIPT_PARAMS = "defaults 24 76"

inherit update-rc.d

MONITORING_DIR = "usr/web-monitoring"

FILES_${PN} += "${MONITORING_DIR}"

do_install() {
    install -d ${D}/${sysconfdir}/init.d/
    install -c -m0755 ${WORKDIR}/${INITSCRIPT_NAME}             ${D}/${sysconfdir}/init.d/${INITSCRIPT_NAME}

    install -d ${D}/usr/
    install -d ${D}/${MONITORING_DIR}/
    install -d ${D}/${MONITORING_DIR}/bin/
    install -d ${D}/${MONITORING_DIR}/public/
    install -d ${D}/${MONITORING_DIR}/public/stylesheets/
    install -d ${D}/${MONITORING_DIR}/routes/
    install -d ${D}/${MONITORING_DIR}/views/

    install -m0644 ${S}/server-application/app.js               ${D}/${MONITORING_DIR}/app.js
    install -m0644 ${S}/server-application/package.json         ${D}/${MONITORING_DIR}/package.json
    install -m0644 ${S}/server-application/bin/www              ${D}/${MONITORING_DIR}/bin/www
    install -m0644 ${S}/server-application/public/stylesheets/style.css ${D}/${MONITORING_DIR}/public/stylesheets/style.css
    install -m0644 ${S}/server-application/routes/index.js      ${D}/${MONITORING_DIR}/routes/index.js
    install -m0644 ${S}/server-application/routes/users.js      ${D}/${MONITORING_DIR}/routes/users.js
    install -m0644 ${S}/server-application/views/*              ${D}/${MONITORING_DIR}/views/
}
