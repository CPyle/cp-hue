var Hue;
(function (Hue) {
    var CreateUserResponse = (function () {
        function CreateUserResponse() {
        }
        return CreateUserResponse;
    })();
    Hue.CreateUserResponse = CreateUserResponse;

    var HueClient = (function () {
        function HueClient(host, username) {
            this.lightsApi = null;
            this.host = host;
            this.username = username;
        }
        HueClient.prototype.lights = function () {
            if (this.lightsApi != null) {
                return this.lightsApi;
            }
            if (this.host == null || this.username == null) {
                throw "Host and username must be set to use the lights api";
            }
            this.lightsApi = new Hue.Lights.LightsApi(this.host, this.username);
            return this.lightsApi;
        };

        HueClient.prototype.setUserName = function (username) {
            this.username = username;
        };

        HueClient.prototype.createUser = function (deviceType, userName) {
            var tries = 0;

            var message = {
                devicetype: deviceType,
                username: userName
            };
            var def = jQuery.Deferred();

            function tryCreate() {
                jQuery.post(this.host + '/api', message, function (data) {
                    if (data.length > 0 && data[0].success) {
                        var response = new CreateUserResponse();
                        response.username = data[0].success.username;
                        def.resolve(response);
                    } else {
                        tries++;
                        if (tries < 60) {
                            setTimeout(tryCreate, 1000);
                        } else {
                            def.fail();
                        }
                    }
                });
            }
            ;

            return def.promise();
        };
        return HueClient;
    })();
    Hue.HueClient = HueClient;
})(Hue || (Hue = {}));
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
//# sourceMappingURL=pHue.lib.js.map
