/// <reference path="scripts/lights/lightsapi.ts" />
var Lights = Hue.Lights;

var CreateUserResponse = (function () {
    function CreateUserResponse() {
    }
    return CreateUserResponse;
})();

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
        this.lightsApi = new Lights.LightsApi(this.host, this.username);
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
//# sourceMappingURL=pHue.js.map
