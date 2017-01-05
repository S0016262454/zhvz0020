jQuery.sap.declare("zhvz0020.controller.CustomPanel");

sap.m.P13nPanel.extend("zhvz0020.controller.CustomPanel", /** @lends sap.m.sample.P13nDialogWithCustomPanel.CustomPanel */ {
	constructor: function(sId, mSettings) {
		sap.m.P13nPanel.apply(this, arguments);
	},
	metadata: {
		library: "sap.m",
		aggregations: {

			/**
			 * Control embedded into CustomPanel
			 */
			content: {
				type: "sap.m.RadioButtonGroup",
				multiple: false,
				singularName: "content"
			}
		}
	},
	renderer: function(oRm, oControl) {
		if (!oControl.getVisible()) {
			return;
		}
		oRm.renderControl(oControl.getContent());
	},
	handleOK: function(oEvent) {
		this._storeShowResetEnabled();
		this.oPersonalizationDialog.close();
		// this.getView().removeDependents();
	},

	handleCancel: function(oEvent) {
		this.oPersonalizationDialog.close();
	},
	onPersonalizationDialogPress: function(oEvent) {
		var oPersonalizationDialog = this._getDialog();

		oPersonalizationDialog.setShowResetEnabled(this.bShowResetEnabled);
		this.bIsReseted = false;

		oPersonalizationDialog.open();
	},

	onAddColumnsItem: function(oEvent) {
		sap.m.MessageToast.show("Event 'addColumnsItem' fired in order to move the selected column item", {
			width: "auto"
		});
	},

	onChangeColumnsItem: function(oEvent) {
		sap.m.MessageToast.show("Event 'changeColumnsItem' fired in order to move the selected column item", {
			width: "auto"
		});
	},

	_storeShowResetEnabled: function() {
		if (this.bIsReseted) {
			this.bShowResetEnabled = false;
		} else {
			this.bShowResetEnabled = this.oPersonalizationDialog.getShowResetEnabled();
		}
	},

	_getDialog: function() {
		if (this.oPersonalizationDialog) {
			return this.oPersonalizationDialog;
		}

		// associate controller with the fragment
		this.oPersonalizationDialog = sap.ui.xmlfragment("zhvz0020.view.Dialog4", this);
		this.getView().addDependent(this.oPersonalizationDialog);

		// this.getView().setModel(new sap.ui.model.json.JSONModel("test-resources/sap/m/demokit/sample/P13nDialogWithCustomPanel/products.json"));

		// toggle compact style
		jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this.oPersonalizationDialog);

		// set explored app's demo model on this sample
		// this.getView().setModel(new sap.ui.model.json.JSONModel("test-resources/sap/m/demokit/sample/P13nDialog/products.json"));
		// this.getView().setModel(new sap.ui.model.resource.ResourceModel({
		// 	bundleName: "sap.m.sample.P13nDialog.i18n.i18n"
		// }), "i18n");

		return this.oPersonalizationDialog;
	}
});