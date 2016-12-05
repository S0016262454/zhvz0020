jQuery.sap.registerModulePath("zhyi0010", "/zhyi0010"); 
jQuery.sap.require("zhyi0010.commons.zhyi0010_0010_commons");

jQuery.sap.includeStyleSheet('/zhyi0010/css/zhyi0010_0010.css');

sap.ui.define([
	"sap/ui/core/mvc/Controller",
		'sap/m/Button',
		'sap/m/Dialog',
		'sap/m/MessageToast',
		'sap/m/Text',
		'sap/m/TextArea',
		'sap/ui/layout/HorizontalLayout',
		'sap/ui/layout/VerticalLayout',
		'sap/ui/model/json/JSONModel',
		'sap/ui/core/util/Export',
		'sap/ui/core/util/ExportTypeCSV',
		'zhvz0020/model/Formatter',
	"zhyi0010/commons/zhyi0010_0010_commons"
], function(Controller, Button, Dialog, MessageToast, Text, TextArea, HorizontalLayout, VerticalLayout, JSONModel, Export, ExportTypeCSV, Formatter, ommons) {
	"use strict";

var locale = sap.ui.getCore().getConfiguration().getLanguage();
/*var oBundle = new sap.ui.model.resource.ResourceModel({

			bundleUrl: "/zhyi0010/i18n/i18n.properties",

			locale: locale

	});
*/	
	var oBundle = jQuery.sap.resources({url : "/zhyi0010/i18n/i18n.properties", locale: locale});
		sap.ui.getCore().setModel(oBundle, "i18n");


// var path = jQuery.sap.getModulePath("yourComponent", "/zhyi0010/images/hoimi.jpg");
// var image = $("#yourImageid");
// image.attr("src", path);

// var img = new sap.m.Image({
//	 src : "/zhyi0010/images/hoimi.jpg"
// });

	jQuery.sap.log.setLevel(jQuery.sap.log.Level.ERROR);

	jQuery.sap.log.warning("This should never have happened!");
	
/*	var sText = oBundle.getText("appTitle");
	
	jQuery.sap.log.error("appTitle : " + sText);
	
*/	return Controller.extend("zhvz0020.controller.zhvz0020_0010", {

		onInit: function () {
			// set explored app's demo model on this sample
/*			this.oModel = new JSONModel(jQuery.sap.getModulePath("ZFAV0020.mockdata", "/ZFAV0020.json"));
			var oView = this.getView();
			oView.setModel(this.oModel);
			this.oSF = oView.byId("searchField");
			// var domId = this.byId("searchField").getId();
			// $( "#"+domId	 ).click(function() {
			//	 jQuery.sap.delayedCall(0, this, function() {
			//			 this.byId("searchField").focus();
			//	 });
			// });
*/
//			this.getView().byId('__input0').setTooltip("12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678");
//			this.getView().byId('__label0').setTooltip("12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678");
//			var oRtt = new sap.ui.commons.RichTooltip( "TextRtt2", {text:"This is a smaller RichTooltip that has only the Text"});
//						var oVizFrame = this.getView().byId("__text0");
//			oVizFrame.setTooltip(oRtt);
/*				this.getView().byId('itf1').setVisible(false);
				this.getView().byId('itf2').setVisible(false);
				this.getView().byId('itf3').setVisible(false);*/
/*		this.getView().byId('hoge').onAfterRendering = function() {
				if (sap.ui.commons.Tree.prototype.onAfterRendering) {
					sap.ui.commons.Tree.prototype.onAfterRendering.apply(this, arguments);
						$("#text01").attr("tabindex", 10);
						$("#text02").attr("tabindex", 20);
						$("#text03").attr("tabindex", 30);
						$("#text04").attr("tabindex", 40);
				}
				// Your code...
		};
*/
/*		this.getView().byId('icf0001').addEventDelegate({
				onAfterRendering: function(){
						$("#text01").attr("tabindex", 10);
						$("#text02").attr("tabindex", 20);
						$("#text03").attr("tabindex", 30);
						$("#text04").attr("tabindex", 40);
					
				}
			}, this);
*/
			// set explored app's demo model on this sample
			// var oModel = new sap.ui.model.json.JSONModel();
			// oModel.loadData("mockdata/products.json");
			this.oModel = new JSONModel(jQuery.sap.getModulePath("zhvz0020.mockdata", "/ZFAV0020.json"));
			var oView = this.getView();
			oView.setModel(this.oModel);
			this.oSF = oView.byId("searchField");
			// this.getView().setModel(oModel);

			// add buttons with javaScript (yet not possible with XML views)
			// var oHeaderSelect = this.getView().byId("select");
			// var fnOnPress = function (oEvt) {
			//	MessageToast.show("Executed " + oEvt.getSource().getText());
			//	oHeaderSelect.close();
			// };

		},

		// 得意先サジェスト
		onSuggest: function (event) {
//			this.byId("searchField").attr("enableSuggestions", "false");
			var value = event.getParameter("suggestValue");
			if (!value) value='　**';
			if (value === '*') value = '';
			var filters = [];
			if (value) {
//			if (!value) value = "					 ";
				filters = [new sap.ui.model.Filter([
					new sap.ui.model.Filter("Key", function(sText) {
						return (sText || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
					}),
					new sap.ui.model.Filter("TokuisakiCD", function(sDes) {
						return (sDes || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
					}),
					new sap.ui.model.Filter("Tokuisaki", function(sPrefectures) {
						return (sPrefectures || "").toUpperCase().indexOf(value.toUpperCase()) > -1;
//						return (!(sPrefectures || ""));
					})
				], false)];
			// } else {
			//	this.oSF.getBinding("suggestionItems").filter('');
			//	this.oSF.suggest();
			 }
			this.oSF.getBinding("suggestionItems").filter(filters);
			this.oSF.suggest(event);
//		var cocdInput = event.getSource();	
//				console.log(event.getSource().getBinding("suggestionItems").oLastContextData);	
// this methods call trigger new suggestion item displayed	
//cocdInput.setShowSuggestion(true);	
//				cocdInput.setFilterSuggests(false);	 
//				cocdInput.removeAllSuggestionItems();	 

//			this.oSF.liveChange(event);
//			this.oSF.focus();
		},
		handleTableSelectDialogPress: function(oEvent) {
			if (! this._oDialog) {
				this._oDialog = sap.ui.xmlfragment("zhvz0020.view.Dialog", this);
			}

			// Multi-select if required
			var bMultiSelect = !!oEvent.getSource().data("multi");
			this._oDialog.setMultiSelect(bMultiSelect);

			// Remember selections if required
			var bRemember = !!oEvent.getSource().data("remember");
			this._oDialog.setRememberSelections(bRemember);

			this.getView().addDependent(this._oDialog);

			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
			this._oDialog.open();
		},

		onApproveDialog: function () {
			var dialog = new Dialog({
				title: 'Confirm',
				type: 'Message',
				content: new Text({ text: 'Are you sure you want to submit your shopping cart?' }),
				beginButton: new Button({
					text: 'Submit',
					press: function () {
						MessageToast.show('Submit pressed!');
						dialog.close();
					}
				}),
				endButton: new Button({
					text: 'Cancel',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
 
			dialog.open();
		},
		onAfterRendering: function() {

						$("div" + "[id$=text01]").attr("tabindex", 10);
						$("div" + "[id$=text02]").attr("tabindex", 20);
						$(":input" + "[id*=text03]").attr("tabindex", 30);
						$(":input" + "[id*=text04]").attr("tabindex", 40);
		},
		
		onApproveDialog: function () {
			var dialog = new Dialog({
				title: 'Confirm',
				type: 'Message',
				content: new Text({ text: 'Are you sure you want to submit your shopping cart?' }),
				beginButton: new Button({
					text: 'Submit',
					press: function () {
						MessageToast.show('Submit pressed!');
						dialog.close();
					}
				}),
				endButton: new Button({
					text: 'Cancel',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
 
			dialog.open();
		},
 
		onRejectDialog: function () {
			var dialog = new Dialog({
				title: 'Reject',
				type: 'Message',
				content: [
					new Text({ text: 'Are you sure you want to reject your shopping cart?' }),
					new TextArea('rejectDialogTextarea', {
						width: '100%',
						placeholder: 'Add note (optional)'
					})
				],
				beginButton: new Button({
					text: 'Reject',
					press: function () {
						var sText = sap.ui.getCore().byId('rejectDialogTextarea').getValue();
						MessageToast.show('Note is: ' + sText);
						dialog.close();
					}
				}),
				endButton: new Button({
					text: 'Cancel',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
 
			dialog.open();
		},
 
		onSubmitDialog: function () {
			var dialog = new Dialog({
				title: 'Confirm',
				type: 'Message',
				content: [
					new Text({ text: 'Are you sure you want to submit your shopping cart?' }),
					new TextArea('submitDialogTextarea', {
						liveChange: function(oEvent) {
							var sText = oEvent.getParameter('value');
							var parent = oEvent.getSource().getParent();
 
							parent.getBeginButton().setEnabled(sText.length > 0);
						},
						width: '100%',
						placeholder: 'Add note (required)'
					})
				],
				beginButton: new Button({
					text: 'Submit',
					enabled: false,
					press: function () {
						var sText = sap.ui.getCore().byId('submitDialogTextarea').getValue();
						MessageToast.show('Note is: ' + sText);
						dialog.close();
					}
				}),
				endButton: new Button({
					text: 'Cancel',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
 
			dialog.open();
		},
 
		onConfirmDialog: function () {
			var dialog = new Dialog({
				title: 'Confirm',
				type: 'Message',
				content: [
					new HorizontalLayout({
						content: [
							new VerticalLayout({
								width: '120px',
								content: [
									new Text({ text: 'Type: ' }),
									new Text({ text: 'Delivery:' }),
									new Text({ text: 'Items count: ' })
								]
							}),
							new VerticalLayout({
								content: [
									new Text({ text: 'Shopping Cart' }),
									new Text({ text: 'Jun 26, 2013' }),
									new Text({ text: '2' })
								]
							})
						]
					}),
					new TextArea('confirmDialogTextarea', {
						width: '100%',
						placeholder: 'Add note (optional)'
					})
				],
				beginButton: new Button({
					text: 'Submit',
					press: function () {
						var sText = sap.ui.getCore().byId('confirmDialogTextarea').getValue();
						MessageToast.show('Note is: ' + sText);
						dialog.close();
					}
				}),
				endButton: new Button({
					text: 'Cancel',
					press: function () {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
 
			dialog.open();
		},
		toggleFullScreen: function() {
			if (this._fullScreen) {
				this._closeFullScreen();
				this._fullScreen = false;
			} else {
				this._openFullScreen();
				this._fullScreen = true;
			}
			var sIcon = (this._fullScreen ? "sap-icon://exit-full-screen" : "sap-icon://full-screen");
			this._oFullScreenButton.setIcon(sIcon);
		},

		_openFullScreen: function() {
			var s2Controller = this.oApplicationFacade.getApplicationModel("sharedData").getData().s2Controller;
			var masterPage = s2Controller.byId("page").getParent().getParent().$();
			masterPage.css({display: "none"});
		},

		_closeFullScreen: function() {
			var s2Controller = this.oApplicationFacade.getApplicationModel("sharedData").getData().s2Controller;
			var masterPage = s2Controller.byId("page").getParent().getParent().$();
			masterPage.css({display: ""});
		},
		onDataExport : sap.m.Table.prototype.exportData || function(oEvent) {

			var oExport = new Export({

				// Type that will be used to generate the content. Own ExportType's can be created to support other formats
				exportType : new ExportTypeCSV({
					separatorChar : ","
				}),

				// Pass in the model created above
				models : this.getView().getModel(),

				// binding information for the rows aggregation
				rows : {
					path : "/Meisai"
				},

				// column definitions with column name and binding info for the content

				columns : [{
					name : "POSNR",
					template : {
						content : "{POSNR}"
					}
				}, {
					name : "ZZITEM",
					template : {
						content : "{ZZITEM}"
					}
				}, {
					name : "ZZMAKER",
					template : {
						content : "{ZZMAKER}"
					}
				}, {
					name : "ZZSIZE",
					template : {
						content : "{ZZSIZE}"
					}
				}, {
					name : "ZZSIZEUNIT",
					template : {
						content : "{ZZSIZEUNIT}"
					}
				}, {
					name : "LGORT",
					template : {
						content : "{LGORT}"
					}
				}, {
					name : "CHARG",
					template : {
						content : "{CHARG}"
					}
				}, {
					name : "KWMENG",
					template : {
						content : "{KWMENG}"
					}
				}]
			});

			// download exported file
			oExport.saveFile().catch(function(oError) {
				MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function() {
				oExport.destroy();
			});
		}
	});
});