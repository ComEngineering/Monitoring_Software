DESCRIPTION = "Node.js snmp lib"
HOMEPAGE = "https://github.com/joyent/node-snmpjs"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"


DEPENDS = "nodejs-native nodejs"

S = "${WORKDIR}/git"

SRC_URI = "git://github.com/joyent/node-snmpjs;protocol=git;branch=master;rev=c4a77ef8556c47bfd35cb02a5c9d4876c117d99f"

inherit npm-install-global
