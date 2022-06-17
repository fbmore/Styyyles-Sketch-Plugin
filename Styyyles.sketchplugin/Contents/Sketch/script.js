var onRun = function(context) {
    var sketch = require('sketch')
    var ui = require('sketch/ui')

    var	document = sketch.getSelectedDocument();

    var Page = require('sketch/dom').Page
    var data = document.sketchObject.documentData();
    var page = document.selectedPage;
    

    var tempPage = new Page({
      name: 'working...',
    })

    tempPage.parent = document

    tempPage.selected = true;



    //  Find all text layers
    var layers = sketch.find('Text')

    //document.selectedLayers;

    var layerStyles = document.sharedLayerStyles;
    var textStyles = document.sharedTextStyles;

    /// create inventory of SHARED styles (without IDs) so they can be compared between themselves, to merge them and with unstyled layers
    var stylesFromSharedStyles = textStyles.map(style => JSON.stringify(style["style"]).split("opacity")[1]);
    console.log("stylesFromSharedStyles.length")
    console.log(stylesFromSharedStyles.length)
    console.log(stylesFromSharedStyles)

    var uniqueStylesFromSharedStyles = stylesFromSharedStyles.filter(onlyUnique);
    console.log("uniqueStylesFromSharedStyles.length UNIQUE")
    console.log(uniqueStylesFromSharedStyles.length);

      /// create inventory of styles (without IDs) so they can be compared
      var stylesFromLayers = layers.map(style => JSON.stringify(style["style"]).split("opacity")[1]);
      console.log("stylesFromLayers.length")
      console.log(stylesFromLayers.length)
      console.log(stylesFromLayers)

      var uniqueStylesFromLayer = stylesFromLayers.filter(onlyUnique);
      console.log("stylesFromLayers.length UNIQUE")
      console.log(uniqueStylesFromLayer.length);


////
      //var arrayStyleNames = styles.map(style => style["name"]);
//      var arrayStylesInventory = styles.map(style => style["style"]);
var arrayStylesInventory = layers.map(style => style["style"]);
console.log(arrayStylesInventory)

for (s = 0; s < arrayStylesInventory.length; ++s){
  
  // console.log("compare styles without IDs")
  var s1 = arrayStylesInventory[0];
  var s2 = arrayStylesInventory[1];  

  // const allowedKeys = Object.keys(arrayStylesInventory[0]);
  console.log("compare via stringify")
  // console.log(JSON.stringify(s1).split("opacity")[1])
  // console.log(JSON.stringify(s2).split("opacity")[1])
  // console.log(s1.textColor)
  // console.log(s2.textColor)
  // console.log(s1.fills)
  // console.log(s2.fills)
  
  // console.log("colors: " + (s1.textColor === s2.textColor))
  // console.log("fills: " + (s1.fills[0] == s2.fills[0]))
  compareStyles(s1,s2)
  // console.log("compare Stringigied: " + (JSON.stringify(s1).split("opacity")[1] === JSON.stringify(s2).split("opacity")[1]))
  // console.log(Object.keys(tempObj).filter((key) => key !== "textColor"));

  // console.log("compareJSON: " + compareJSON(tempObj, tempObj2, []))
  // console.log(delete tempObj.fills);
  // console.log(delete tempObj["id"]);
}
      

      // console.log(layer.name)
      console.log("arrayStylesInventory.length")
      console.log(arrayStylesInventory.length)
      // console.log(arrayStyleNames.indexOf(layer.name))
      console.log("arrayStylesInventory");
      console.log(arrayStylesInventory);
      console.log("arrayStylesInventory END");

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }



////
    var margin = 0;
    var moveby = 0;
    var lineHeightMultiplier = 1.5;

    var GeneratedStylesArray = [];

    var create = function create(document,layer,stylename) {

      console.log("Yes/No?")
      if (layer.type === "Text"){
        var styles = document.sharedTextStyles;
      }
      if (layer.type === "ShapePath"){
        var styles = document.sharedLayerStyles;
      }

      if (layer.type === "Shape"){
        var styles = document.sharedLayerStyles;
      }
      
      var arrayStyleNames = styles.map(style => style["name"]);


      /// reload styles to make sure they inlcude the ones just created too
      var textStyles = document.sharedTextStyles;

    /// create inventory of SHARED styles (without IDs) so they can be compared between themselves, to merge them and with unstyled layers
    var stylesFromSharedStyles = textStyles.map(style => JSON.stringify(style["style"]).split("opacity")[1]);
   

      /// IF JSON.stringify(style["style"]).split("opacity")[1])
      var styleIndex = stylesFromSharedStyles.indexOf(JSON.stringify(layer.style).split("opacity")[1]);
      if (styleIndex === -1) {
        
        console.log("new style to create");
        var sharedStyle = sketch["default"].SharedStyle.fromStyle({
          // name: layer.name,
          name: stylename,
          style: layer.style,
          document: document
        });
      } else {
        console.log("already existing, applying it if one is not applied");

        var sharedStyleToReplaceWith = document.sharedTextStyles[styleIndex]
        console.log(sharedStyleToReplaceWith)
        // find matching style ID and apply it
        layer.sharedStyle = sharedStyleToReplaceWith
        layer.style = sharedStyleToReplaceWith.style          
      }


      // if (arrayStyleNames.indexOf(layer.name) === -1) {
      //   var sharedStyle = sketch["default"].SharedStyle.fromStyle({
      //     //name: layer.name,
      //     name: stylename,
      //     style: layer.style,
      //     document: document
      //   });
      // } else {
      //   console.log("already existing");
      // }
    }


    // var StylesArrayColors = arrayColorNamesAndValues;
    var layername = "";
    var stylename = "";
    var colorname;
    var colorindex;
    var layer;
    var textStyles;
    var styles;

    //StylesArrayColors;


    // Generate Typography and Styles
    for (c = 0; c < layers.length; ++c){

      layer = layers[c];

      if (layer.type === "Text"){
        stylename = layer.name;
      }
      if (layer.type === "ShapePath"){
        stylename = layer.name;
      }

      if (layer.type === "Shape"){
        stylename = layer.name;
      }

      var divider = " - "

      stylename = "Auto/" + layer.style.fontSize +"/"+ layer.style.fontFamily + divider + layer.style.fontSize + divider + layer.style.textColor + divider + layer.style.alignment;

      // Add TextStyle to document
      create(document,layer,stylename);


      if (layer.type === "Text"){
        var styles = document.sharedTextStyles;
      }
      if (layer.type === "ShapePath"){
        var styles = document.sharedLayerStyles;
      }
      if (layer.type === "Shape"){
        var styles = document.sharedLayerStyles;
      }

      console.log(styles.length)

      /// map all styles IDs
      var arrayStyleIDs = styles.map(sharedstyle => sharedstyle["id"]);
      var arrayStyleNames = styles.map(sharedstyle => sharedstyle["name"]);
      var arrayStyleNamesAndIDs = styles.map(sharedstyle => [sharedstyle["name"], sharedstyle["id"]]);

      console.log("sharedStyleId + style ---------------------")

      var arrayStyleIDs = styles.map(sharedstyle => sharedstyle["id"]);
      var arrayStyleNames = styles.map(sharedstyle => sharedstyle["name"]);
      var arrayStyleNamesAndIDs = styles.map(sharedstyle => [sharedstyle["name"], sharedstyle["id"]]);

      if (arrayStyleNames.indexOf(layer.name) !== -1) {
        // update preexisting style
        layer.sharedStyleId = arrayStyleIDs[arrayStyleNames.indexOf(layer.name)];
        styles[arrayStyleNames.indexOf(layer.name)].style = layer.style;

      }

      console.log(layer.sharedStyleId)
      console.log(layer.style)
      console.log("styles + arrayStyleNames [0] ---------------------")

      // console.log(arrayStyleNames[0])

      console.log("sharedStyleId + style ---------------------")

    }


    tempPage.remove();

    ui.message("🌈: Yay! Done generating styles! 👏 🚀");



    function compareStyles(s1,s2) {
      // ignores the style ID - compares only the rest of the properties
      console.log("compare Stringified: " + (JSON.stringify(s1).split("opacity")[1] === JSON.stringify(s2).split("opacity")[1]))
      if (JSON.stringify(s1).split("opacity")[1] !== JSON.stringify(s2).split("opacity")[1]){
        return false  
      } else {
        return true
      }
      
    }
    
    


};
          