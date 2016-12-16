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
	"zhyi0010/commons/zhyi0010_0010_commons",
	'sap/ui/model/Filter',
	"sap/ui/model/FilterOperator",
	"sap/ui/unified/Currency",
	"sap/ui/table/Column",
	'sap/ui/model/Sorter'
], function(Controller, Button, Dialog, MessageToast, Text, TextArea, HorizontalLayout, VerticalLayout, JSONModel, Export, ExportTypeCSV,
	Formatter, commons, Filter, FilterOperator, Currency, Column, Sorter) {
	"use strict";

	var locale = sap.ui.getCore().getConfiguration().getLanguage();
	/*var oBundle = new sap.ui.model.resource.ResourceModel({

				bundleUrl: "/zhyi0010/i18n/i18n.properties",

				locale: locale

		});
	*/
	var oBundle = jQuery.sap.resources({
		url: "/zhyi0010/i18n/i18n.properties",
		locale: locale
	});
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
		
	*/
	return Controller.extend("zhvz0020.controller.zhvz0020_0010", {

		onInit: function() {
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
		onSuggest: function(event) {
			//			this.byId("searchField").attr("enableSuggestions", "false");
			var value = event.getParameter("suggestValue");
			if (!value) value = '　**';
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
			if (!this._oDialog) {
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
//----------------------------↓ここから↓----------------------------
		//在庫決定が押されたとき
		handleTableSelectDialogPress2: function(oEvent) {
			if (!this._oDialog2) {
				this._oDialog2 = sap.ui.xmlfragment("zhvz0020.view.Dialog2", this);
			}

			// Multi-select if required
			var bMultiSelect = !!oEvent.getSource().data("multi");
			this._oDialog2.setMultiSelect(bMultiSelect);

			// Remember selections if required
			var bRemember = !!oEvent.getSource().data("remember");
			this._oDialog2.setRememberSelections(bRemember);

			this.getView().addDependent(this._oDialog2);

			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog2);
			this._oDialog2.open();
		},
//----------------------------↓さらにここから(search)↓----------------------------
		//検索（全項目から）
		handleSearch: function(oEvent) {
			var sValue = oEvent.getParameter("value");

			var filters = [];
			if (sValue) {
				filters = [new sap.ui.model.Filter([
					new sap.ui.model.Filter("MAKTX", function(sMAKTX) {
						return (sMAKTX || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
					}),
					new sap.ui.model.Filter("MATNR", function(sMATNR) {
						return (sMATNR || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
					}),
					new sap.ui.model.Filter("WERKS", function(sWERKS) {
						return (sWERKS || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
					}),
					new sap.ui.model.Filter("LGORT", function(sLGORT) {
						return (sLGORT || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
					}),
					new sap.ui.model.Filter("MEINS", function(sMEINS) {
						return (sMEINS || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
					}),
					new sap.ui.model.Filter("CHARG", function(sCHARG) {
						return (String(sCHARG) || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
					}),
					new sap.ui.model.Filter("QUANT", function(sQUANT) {
						return (String(sQUANT) || "").toUpperCase().indexOf(sValue.toUpperCase()) > -1;
					})
				], false)];
			}
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter(filters);
		},
//----------------------------↓さらにここから(明細入力/明細一覧連動)↓----------------------------

onSelectionListChange : function(oEvent){
	//あとで
		var sValue = oEvent.getParameter("value");
	
},
onTabSelectionChangeExpand : function(oEvent){
	
	var eGetParameter = oEvent.getParameter("selectedKey");
	
	jQuery.sap.log.setLevel(jQuery.sap.log.Level.WARNING);
	jQuery.sap.log.warning("Expand：getApplyContentPadding = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getApplyContentPadding());
	jQuery.sap.log.warning("Expand：getBackgroundDesign = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getBackgroundDesign());
	jQuery.sap.log.warning("Expand：getContent = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getContent());
	jQuery.sap.log.warning("Expand：getExpandable = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getExpandable());
	jQuery.sap.log.warning("Expand：getExpanded = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getExpanded());
	jQuery.sap.log.warning("Expand：getHeaderMode = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getHeaderMode());
	jQuery.sap.log.warning("Expand：getItems = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getItems());
	jQuery.sap.log.warning("Expand：getSelectedKey = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getSelectedKey());
	jQuery.sap.log.warning("Expand：getShowOverflowSelectList = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getShowOverflowSelectList());
	jQuery.sap.log.warning("Expand：getStretchContentHeight = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getStretchContentHeight());
	jQuery.sap.log.warning("Expand：getUpperCase = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getUpperCase());


},
onTabSelectionChangeSelect : function(oEvent){
	
	var sGetParameter = oEvent.getParameter("selectedKey");
	
	jQuery.sap.log.setLevel(jQuery.sap.log.Level.WARNING);
	jQuery.sap.log.warning("Select：getApplyContentPadding = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getApplyContentPadding());
	jQuery.sap.log.warning("Select：getBackgroundDesign = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getBackgroundDesign());
	jQuery.sap.log.warning("Select：getContent = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getContent());
	jQuery.sap.log.warning("Select：getExpandable = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getExpandable());
	jQuery.sap.log.warning("Select：getExpanded = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getExpanded());
	jQuery.sap.log.warning("Select：getHeaderMode = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getHeaderMode());
	jQuery.sap.log.warning("Select：getItems = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getItems());
	jQuery.sap.log.warning("Select：getSelectedKey = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getSelectedKey());
	jQuery.sap.log.warning("Select：getShowOverflowSelectList = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getShowOverflowSelectList());
	jQuery.sap.log.warning("Select：getStretchContentHeight = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getStretchContentHeight());
	jQuery.sap.log.warning("Select：getUpperCase = " + sap.ui.getCore().byId(this.createId("idIconTabBarSeparatorNoIcon2")).getUpperCase());

},

// //----------------------------↓さらにここから(sort)↓----------------------------
//ちょっとおいておく
// 		columnFactory : function(sId, oContext) {
// 			var oModel = this.getView().getModel();
// 			var sName = oContext.getProperty("name");
// 			var sType = oContext.getProperty("type");
// 			var sSemantics = oContext.getProperty("sap:semantics");
// 			var bVisible = oContext.getProperty("sap:visible") != "false";
// 			var iLen = oContext.getProperty("maxLength");
// 			iLen = iLen ? parseInt(iLen, 10) : 10;
 
// 			function specialTemplate() {
// 				var sUnit = oContext.getProperty("sap:unit");
// 				if (sUnit) {
// 					var sUnitType = oModel.getMetaModel().getMetaContext("/ProductSet/" + sUnit).getProperty()["sap:semantics"];
// 					if (sUnitType == "currency-code") {
// 						return new Currency({value: {path: sName, type: new String()}, currency: {path: sName}});
// 					}
// 				}
// 				return null;
// 			}
 
// 			return new Column(sId, {
// 				visible: bVisible && sSemantics != "unit-of-measure" && sSemantics != "currency-code",
// 				sortProperty:  sName ,
// 				filterProperty: oContext.getProperty("sap:filterable") == "true" ? sName : null,
// 				width: (iLen > 9 ? (iLen > 50 ? 15 : 10) : 5) + "rem",
// 				label: new sap.m.Label({text: "{/#Product/" + sName + "/@sap:label}"}),
// 				hAlign: sType && sType.indexOf("Decimal") >= 0 ? "End" : "Begin",
// 				template: specialTemplate() || new Text({text: {path: sName}})
// 			});
// 		},

//----------------------------↓さらにここから(sort(ぽっぷあっぷver.))↓----------------------------
// onExit : function () {
// 			if (this._oDialog3) {
// 				this._oDialog3.destroy();
// 			}
// 		},
 
// 		handleViewSettingsDialogButtonPressed: function (oEvent) {
// 			if (!this._oDialog3) {
// 				this._oDialog3 = sap.ui.xmlfragment("zhvz0020.view.Dialog3", this);
// 			}
// 			// toggle compact style
// 			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog3);
// 			this._oDialog3.open();
// 		},
 
// 		handleConfirm: function(oEvent) {
 
// 			var oView = this.getView();
// 			var oTable = oView.byId("idProductsTable");
 
// 			var mParams = oEvent.getParameters();
// 			var oBinding = oTable.getBinding("items");
 
// 			// apply sorter to binding
// 			// (grouping comes before sorting)
// 			var aSorters = [];
// 			if (mParams.groupItem) {
// 				var sPath = mParams.groupItem.getKey();
// 				var bDescending = mParams.groupDescending;
// 				var vGroup = this.mGroupFunctions[sPath];
// 				aSorters.push(new Sorter(sPath, bDescending, vGroup));
// 			}
// 			var sPath = mParams.sortItem.getKey();
// 			var bDescending = mParams.sortDescending;
// 			aSorters.push(new Sorter(sPath, bDescending));
// 			oBinding.sort(aSorters);
 
// 			// apply filters to binding
// 			var aFilters = [];
// 			jQuery.each(mParams.filterItems, function (i, oItem) {
// 				var aSplit = oItem.getKey().split("___");
// 				var sPath = aSplit[0];
// 				var sOperator = aSplit[1];
// 				var sValue1 = aSplit[2];
// 				var sValue2 = aSplit[3];
// 				var oFilter = new Filter(sPath, sOperator, sValue1, sValue2);
// 				aFilters.push(oFilter);
// 			});
// 			oBinding.filter(aFilters);
 
// 			// update filter bar
// 			oView.byId("vsdFilterBar").setVisible(aFilters.length > 0);
// 			oView.byId("vsdFilterLabel").setText(mParams.filterString);
// 		},
//----------------------------↑ここまで↑----------------------------
		onAfterRendering: function() {

			$("div" + "[id$=text01]").attr("tabindex", 10);
			$("div" + "[id$=text02]").attr("tabindex", 20);
			$(":input" + "[id*=text03]").attr("tabindex", 30);
			$(":input" + "[id*=text04]").attr("tabindex", 40);
		},

		onApproveDialog: function() {
			var dialog = new Dialog({
				title: 'Confirm',
				type: 'Message',
				content: new Text({
					text: 'Are you sure you want to submit your shopping cart?'
				}),
				beginButton: new Button({
					text: 'Submit',
					press: function() {
						MessageToast.show('Submit pressed!');
						dialog.close();
					}
				}),
				endButton: new Button({
					text: 'Cancel',
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
			dialog.open();
		},

		onRejectDialog: function() {
			var dialog = new Dialog({
				title: 'Reject',
				type: 'Message',
				content: [
					new Text({
						text: 'Are you sure you want to reject your shopping cart?'
					}),
					new TextArea('rejectDialogTextarea', {
						width: '100%',
						placeholder: 'Add note (optional)'
					})
				],
				beginButton: new Button({
					text: 'Reject',
					press: function() {
						var sText = sap.ui.getCore().byId('rejectDialogTextarea').getValue();
						MessageToast.show('Note is: ' + sText);
						dialog.close();
					}
				}),
				endButton: new Button({
					text: 'Cancel',
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
		},

		onSubmitDialog: function() {
			var dialog = new Dialog({
				title: 'Confirm',
				type: 'Message',
				content: [
					new Text({
						text: 'Are you sure you want to submit your shopping cart?'
					}),
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
					press: function() {
						var sText = sap.ui.getCore().byId('submitDialogTextarea').getValue();
						MessageToast.show('Note is: ' + sText);
						dialog.close();
					}
				}),
				endButton: new Button({
					text: 'Cancel',
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();
		},

		onConfirmDialog: function() {
			var dialog = new Dialog({
				title: 'Confirm',
				type: 'Message',
				content: [
					new HorizontalLayout({
						content: [
							new VerticalLayout({
								width: '120px',
								content: [
									new Text({
										text: 'Type: '
									}),
									new Text({
										text: 'Delivery:'
									}),
									new Text({
										text: 'Items count: '
									})
								]
							}),
							new VerticalLayout({
								content: [
									new Text({
										text: 'Shopping Cart'
									}),
									new Text({
										text: 'Jun 26, 2013'
									}),
									new Text({
										text: '2'
									})
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
					press: function() {
						var sText = sap.ui.getCore().byId('confirmDialogTextarea').getValue();
						MessageToast.show('Note is: ' + sText);
						dialog.close();
					}
				}),
				endButton: new Button({
					text: 'Cancel',
					press: function() {
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
			masterPage.css({
				display: "none"
			});
		},

		_closeFullScreen: function() {
			var s2Controller = this.oApplicationFacade.getApplicationModel("sharedData").getData().s2Controller;
			var masterPage = s2Controller.byId("page").getParent().getParent().$();
			masterPage.css({
				display: ""
			});
		},
		onDataExport: sap.m.Table.prototype.exportData || function(oEvent) {

			var oExport = new Export({

				// Type that will be used to generate the content. Own ExportType's can be created to support other formats
				exportType: new ExportTypeCSV({
					separatorChar: ","
				}),

				// Pass in the model created above
				models: this.getView().getModel(),

				// binding information for the rows aggregation
				rows: {
					path: "/Meisai"
				},

				// column definitions with column name and binding info for the content

				columns: [{
					name: "POSNR",
					template: {
						content: "{POSNR}"
					}
				}, {
					name: "ZZITEM",
					template: {
						content: "{ZZITEM}"
					}
				}, {
					name: "ZZMAKER",
					template: {
						content: "{ZZMAKER}"
					}
				}, {
					name: "ZZSIZE",
					template: {
						content: "{ZZSIZE}"
					}
				}, {
					name: "ZZSIZEUNIT",
					template: {
						content: "{ZZSIZEUNIT}"
					}
				}, {
					name: "LGORT",
					template: {
						content: "{LGORT}"
					}
				}, {
					name: "CHARG",
					template: {
						content: "{CHARG}"
					}
				}, {
					name: "KWMENG",
					template: {
						content: "{KWMENG}"
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