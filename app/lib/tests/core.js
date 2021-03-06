var App = require("core");

require('tests/ti.mocha');

// Core.js tests
describe("core.js", function () {
	// Device Dimensions
	describe("getDeviceDimensions();", function () {
		it("Returns an object of width / height of device's screen", function() {
			var dimensions = App.getDeviceDimensions();

			if(!dimensions.width && !dimensions.height) {
				throw new Error();
			}
		});

		it("Should populate the App.Device object", function() {
			App.getDeviceDimensions();

			if(!App.Device.width && !App.Device.height) {
				throw new Error();
			}
		});
	});

	// Open Screen Routines
	describe("openScreen();", function () {
		it("Opens a controller via a string", function () {
			if(!App.openScreen("main")) {
				throw new Error();
			}
		});

		it("Opens a controller via an Alloy controller object", function () {
			var controller = Alloy.createController("main");

			if(!App.openScreen(controller)) {
				throw new Error();
			}
		});

		// This is for the specific navigation case we have in this app where
		// we auto add a window to any controller opened via openScreen();
		it("Controller opened via openScreen() should have a window", function () {
			var controller = App.openScreen("main");

			if(!controller.window) {
				throw new Error();
			}
		});
	});

	// Orientation handling in controllers
	describe("Orientation Handling", function () {
		it("Bind orientation handling to a controller", function () {
			var controller = Alloy.createController("main");
			controller.window = Ti.UI.createWindow();

			if(!controller.handleOrientation) {
				throw new Error("No handleOrientation method available");
			}

			try {
				App.bindOrientationEvents(controller);
				controller.window.open();
			} catch(e) {
				throw new Error(e);
			}
		});

		it("Set views on controller based on orientation", function () {
			var controller = Alloy.createController("main");
			controller.window = Ti.UI.createWindow();

			try {
				App.setViewsForOrientation(controller);
			} catch (e) {
				throw new Error(e);
			}
		});
	});
});

// run the tests
mocha.run();