var dlh_googlemaps_cookie_name = 'dlh_googlemaps';
var dlh_googlemaps_cookie_days = 365 * 86400;

function dlh_googlemaps_get_cookie() {
    var name = dlh_googlemaps_cookie_name + "=";
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

function dlh_googlemaps_set_cookie() {
    document.cookie = dlh_googlemaps_cookie_name + '=ok; max-age=' + dlh_googlemaps_cookie_days + ' ; path=/';
}

function dlh_googlemaps_load_scripts(map) {
    var function_name = "gmap" + map.id + "_generate";
    if (typeof window[function_name] == "function") {
        var maps_script = document.createElement('script');
        maps_script.type = 'text/javascript';
        maps_script.src = map.api_url + '&callback=' + function_name;
        maps_script.async = true;
        maps_script.defer = true;
        document.getElementsByTagName('head')[0].appendChild(maps_script);
    }
}

function dlh_googlemaps_ask_confirmation(map) {
    var function_name = "gmap" + map.id + "_allow";
    var confirm_element = document.createElement("div");
    confirm_element.setAttribute("id", "confirm-googlemaps");
    confirm_element.innerHTML = map.privacy;
    if (typeof window[function_name] == "function") {
        confirm_element.onclick = window[function_name];
    }

    var map_element = document.getElementById("dlh_googlemap_" + map.id);
    map_element.innerHTML = '';
    map_element.appendChild(confirm_element);
}
