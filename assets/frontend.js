function DlhGoogleMaps() {
    this.cookieName = 'dlh_googlemaps';
    this.cookieDays = 365 * 86400;
    var apiAdded = false;
    var apiInitialized = false;
    var mapCallbacks = [];

    this.getCookie = function () {
        var name = this.cookieName + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return false;
    }

    this.setCookie = function () {
        document.cookie = this.cookieName + '=ok; max-age=' + this.cookieDays + ' ; path=/';
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

    var loadApi = function (map) {
        if (!apiAdded) {
            apiAdded = true;
            var mapsScript = document.createElement('script');
            mapsScript.type = 'text/javascript';
            mapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=' + map.apiKey + '&language=' + map.apiLanguage + '&callback=dlhGoogleMaps.apiInitCallback';
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
