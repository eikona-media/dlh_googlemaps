function DlhGoogleMaps() {
    this.storageItemName = 'dlh_googlemaps';
    this.cookieDays = 365 * 86400;
    var apiAdded = false;
    var apiInitialized = false;
    var mapCallbacks = [];

    this.hasStorageItem = function () {
        var item = localStorage.getItem(this.storageItemName)
        if (item !== null) {
            return true
        }
        return false;
    }

    this.setStorageItem = function () {
        localStorage.setItem(this.storageItemName, JSON.stringify({value: 'ok', timestamp: new Date().getTime()}));
    }

    this.generateMap = function (map) {
        var functionName = "gmap" + map.id + "_generate";
        mapCallbacks.push(functionName);
        loadApi(map);
        if (apiInitialized) {
            initCallbacks();
        }
    }

    this.apiInitCallback = function () {
        apiInitialized = true;
        initCallbacks();
    }

    this.askConfirmation = function (map) {
        var functionName = "gmap" + map.id + "_allow";
        var confirmElement = document.createElement("div");
        confirmElement.setAttribute("id", "confirm-googlemaps");
        confirmElement.innerHTML = map.privacy;
        if (typeof window[functionName] == "function") {
            confirmElement.onclick = window[functionName];
        } else {
            console.log(functionName + ' is missing');
        }

        var mapElement = document.getElementById("dlh_googlemap_" + map.id);
        mapElement.innerHTML = '';
        mapElement.appendChild(confirmElement);
    }

    this.showCancel = function () {
        var x = document.getElementsByClassName("dlh_googlemap_cancel");
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "block";
        }
    }

    this.hideCancel = function () {
        var x = document.getElementsByClassName("dlh_googlemap_cancel");
        var i;
        for (i = 0; i < x.length; i++) {
            x[i].style.display = "none";
        }
    }

    this.cancelConfirmation = function () {
        localStorage.removeItem(this.storageItemName);
        location.reload();
    }

    var loadApi = function (map) {
        if (!apiAdded) {
            apiAdded = true;
            var mapsScript = document.createElement('script');
            mapsScript.type = 'text/javascript';
            mapsScript.src = '//maps.googleapis.com/maps/api/js?key=' + map.apiKey + '&language=' + map.apiLanguage + '&callback=dlhGoogleMaps.apiInitCallback';
            mapsScript.async = true;
            mapsScript.defer = true;
            document.getElementsByTagName('head')[0].appendChild(mapsScript);
        }
    }

    var initCallbacks = function () {
        for (i = 0; i < mapCallbacks.length; i++) {
            var functionName = mapCallbacks[i];
            if (typeof window[functionName] == "function") {
                window[functionName]();
            } else {
                console.log(functionName + ' is missing');
            }
        }
    }
}

var dlhGoogleMaps = new DlhGoogleMaps();
