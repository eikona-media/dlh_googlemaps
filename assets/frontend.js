function DlhGoogleMaps() {
    this.cookieName = 'dlh_googlemaps';
    this.cookieDays = 365 * 86400;

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

    this.loadScripts = function (map) {
        var functionName = "gmap" + map.id + "_generate";
        if (typeof window[functionName] == "function") {
            var mapsScript = document.createElement('script');
            mapsScript.type = 'text/javascript';
            mapsScript.src = map.api_url + '&callback=' + functionName;
            mapsScript.async = true;
            mapsScript.defer = true;
            document.getElementsByTagName('head')[0].appendChild(mapsScript);
        }
    }

    this.askConfirmation = function (map) {
        var functionName = "gmap" + map.id + "_allow";
        var confirmElement = document.createElement("div");
        confirmElement.setAttribute("id", "confirm-googlemaps");
        confirmElement.innerHTML = map.privacy;
        if (typeof window[functionName] == "function") {
            confirmElement.onclick = window[functionName];
        }

        var mapElement = document.getElementById("dlh_googlemap_" + map.id);
        mapElement.innerHTML = '';
        mapElement.appendChild(confirmElement);
    }
}

var dlhGoogleMaps = new DlhGoogleMaps();
