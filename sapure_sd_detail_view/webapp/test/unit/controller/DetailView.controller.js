/*global QUnit*/

sap.ui.define([
	"zc503sdgw0002/sapure_sd_detail_view/controller/DetailView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("DetailView Controller");

	QUnit.test("I should test the DetailView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
