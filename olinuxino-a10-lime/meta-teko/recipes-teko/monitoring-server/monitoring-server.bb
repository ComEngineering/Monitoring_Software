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

inherit update-rc.d allarch

FILES_${PN} = " \
    /etc/init.d/* \
    /usr/web-monitoring/bin/ \
    /usr/web-monitoring/public/ \
    /usr/web-monitoring/public/stylesheets/ \
    /usr/web-monitoring/routes/ \
    /usr/web-monitoring/views/ \
"

do_install() {
    install -d ${D}/${sysconfdir}/init.d
    install -c -m 0755 ${WORKDIR}/${INITSCRIPT_NAME} ${D}/${sysconfdir}/init.d/${INITSCRIPT_NAME}
    install -d ${D}/usr/web-monitoring
    install -d ${D}/usr/web-monitoring/bin
    install -m 0644 ${S}/server-application/bin/* ${D}/usr/web-monitoring/bin

    install -d ${D}/usr/web-monitoring/public
#    install -m 0644 ${S}/server-application/public/* ${D}/usr/web-monitoring/public
    install -d ${D}/usr/web-monitoring/public/stylesheets
    install -m 0644 ${S}/server-application/public/stylesheets/* ${D}/usr/web-monitoring/public/stylesheets

    install -d ${D}/usr/web-monitoring/routes
    install -m 0644 ${S}/server-application/routes/* ${D}/usr/web-monitoring/routes
    install -d ${D}/usr/web-monitoring/views
    install -m 0644 ${S}/server-application/views/* ${D}/usr/web-monitoring/views
}
