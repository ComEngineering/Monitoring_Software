#
# This file was derived from the 'Hello World!' example recipe in the
# Yocto Project Development Manual.
#

DESCRIPTION = "Simple helloworld application"
SECTION = "teko"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://${COMMON_LICENSE_DIR}/MIT;md5=0835ade698e0bcf8506ecda2f7b4f302"
PR = "r0"

inherit npm

DEPENDS = "nodejs node-gyp-native libmodbus"

SRC_URI = "file://mbrequester.cc \
file://binding.gyp \
file://types.h \
file://mb_2b_request.h \
file://mb_2b_request.cpp \
file://ModbusAbstructDevice.h \
file://ModbusAbstructDevice.cpp \
file://ThermalDevice.h \
file://ThermalDevice.cpp"

S = "${WORKDIR}"

do_configure() {
    export LD="${CXX}"
    export GYP_DEFINES="sysroot=${STAGING_DIR_HOST}"
    node-gyp --arch ${TARGET_ARCH} configure
}

do_compile() {
    export LD="${CXX}"
    export GYP_DEFINES="sysroot=${STAGING_DIR_HOST}"
    node-gyp --arch ${TARGET_ARCH} build
}

do_install() {
    install -D -m 0755 ${S}/build/Release/mbrequester.node ${D}${libdir}/nodejs/mbrequester.node
}

# Prevents do_package failures with:
# debugsources.list: No such file or directory:
INHIBIT_PACKAGE_DEBUG_SPLIT = "1"
