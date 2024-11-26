/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zc503sdgw0002/sapure_sd_detail_view/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
