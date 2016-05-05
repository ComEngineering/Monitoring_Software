DESCRIPTION = "Node.js serialport lib"
HOMEPAGE = "https://github.com/alexgorbatchev/node-crc"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"


DEPENDS = "nodejs-native nodejs"

S = "${WORKDIR}/git"

SRC_URI = "git://github.com/alexgorbatchev/node-crc;protocol=git;branch=master;rev=f8c487d3cd9e00aa2ad1513e197d1f16bc18683f"

inherit npm-install-global
