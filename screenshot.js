// Sketchfab Viewer API: Save current render as image
var version = '1.10.1';
var iframe = document.getElementById('api-frame');
var uid = '17d2a17086b04c96b7b00dcaf1e4029f';
var client = new window.Sketchfab(version, iframe);

var error = function error() {
  console.error('Sketchfab API error');
};

var success = function success(api) {
  api.start(function () {
    document.getElementById('screenshot').addEventListener('click', function () {
        api.getScreenShot(window.innerWidth, window.innerHeight, 'image/png', function (err, result) {
            Screenshot.postMessage(result);
        });
    });
      
    document.getElementById('pos1').addEventListener('click', function () {
        updateItem(api, 0, '68ddbf05896642b5a97db09fc175695b');
    });
      
    document.getElementById('pos2').addEventListener('click', function () {
        updateItem(api, 1, '8efd518b99f3474eb263ecbde9e60680');
    });
      
    document.getElementById('pos3').addEventListener('click', function () {
        updateItem(api, 2, '598385fdee2849bfa8dacb98f28e73a3');
    });
  });
};

function updateItem(api, id, textureUid) {
    var queryDict = {}
    location.search.substr(1).split("&").forEach(function(item) {
        queryDict[item.split("=")[0]] = item.split("=")[1];
    });
    
    api.gotoAnnotation(id, {preventCameraAnimation: false, preventCameraMove: false}, function(err, index) {
        if (!err) {
            window.console.log('Going to annotation', index + 1);
        }
    });
    
    if (queryDict["updatedTitle"] !== null && queryDict["updatedTitle"] !== '') {
        api.updateAnnotation(id, {
            title: decodeURIComponent(queryDict["updatedTitle"]),
            content: decodeURIComponent(queryDict["updatedContent"])
        }, function(err, information) {
            if (!err) {
                window.console.log(information);
            }
        });
    }
    
    if (queryDict["updatedImageUrl"] !== null && queryDict["updatedImageUrl"] !== '') {
        window.console.log("imageUrl", queryDict["updatedImageUrl"]);
        api.updateTexture(queryDict["updatedImageUrl"], textureUid, function(err, textureUid) {
            if (!err) {
                window.console.log('Replaced texture with UID', textureUid);
            } else {
                window.console.log('Replaced texture failed with UID', textureUid);
            }
        });
    }
}

client.init(uid, {
  success: success,
  autostart: 1,
  ui_fullscreen: 0,
  ui_vr: 0,
  ui_infos: 0,
  ui_watermark: 0,
  ui_inspector: 0,
    //graph_optimizer: 0,
    //ui_controls
  error: error
});

//////////////////////////////////
// GUI Code
//////////////////////////////////

function initGui() {
  var controls = document.getElementById('controls');
  var buttonsText = '';
  buttonsText += '<button id="screenshot">Capture</button>';
  buttonsText += '<button id="pos1">Pos 1</button>';
  buttonsText += '<button id="pos2">Pos 2</button>';
  buttonsText += '<button id="pos3">Pos 3</button>';
  controls.innerHTML = buttonsText;
}

initGui();
//////////////////////////////////
// GUI Code end
//////////////////////////////////
