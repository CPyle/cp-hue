var Hue;
(function (Hue) {
    (function (Lights) {
        var LightEntry = (function () {
            function LightEntry() {
            }
            return LightEntry;
        })();
        Lights.LightEntry = LightEntry;

        var LightsApi = (function () {
            function LightsApi(host, username) {
                this.host = host;
                this.username = username;
            }
            LightsApi.prototype.all = function () {
                return jQuery.getJSON(this.host + '/api/' + this.username + '/lights');
            };
            return LightsApi;
        })();
        Lights.LightsApi = LightsApi;
    })(Hue.Lights || (Hue.Lights = {}));
    var Lights = Hue.Lights;
})(Hue || (Hue = {}));
//# sourceMappingURL=lightsapi.js.map
