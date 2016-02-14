SUMMARY = "A Modbus library"
DESCRIPTION = "libmodbus is a C library designed to provide a fast and robust \
implementation of the Modbus protocol. It runs on Linux, Mac OS X, FreeBSD, \
QNX and Windows."
HOMEPAGE = "http://www.libmodbus.org/"
SECTION = "libs"

LICENSE = "LGPLv2.1+"
LIC_FILES_CHKSUM = "file://COPYING.LESSER;md5=4fbd65380cdd255951079008b364516c"

SRCREV = "b4763407c549f19dc9889bd54b0e7bc0eef62524"
SRC_URI = "git://github.com/stephane/libmodbus.git"

inherit autotools pkgconfig

S = "${WORKDIR}/git"
