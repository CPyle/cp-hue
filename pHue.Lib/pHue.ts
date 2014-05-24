module Hue {
    export class CreateUserResponse {
        username: string;
    }

    export class HueClient {
        private host: string;
        private username: string;


        private lightsApi: Lights.LightsApi = null;

        constructor(host: string, username?: string) {
            this.host = host;
            this.username = username;
        }

        lights(): Lights.LightsApi {
            if (this.lightsApi != null) {
                return this.lightsApi;
            }
            if (this.host == null || this.username == null) {
                throw "Host and username must be set to use the lights api";
            }
            this.lightsApi = new Lights.LightsApi(this.host, this.username);
            return this.lightsApi;
        }

        setUserName(username: string): void {
            this.username = username;
        }

        createUser(deviceType: string, userName: string): JQueryPromise<CreateUserResponse> {
            var tries: number = 0;

            var message = {
                devicetype: deviceType,
                username: userName
            };
            var def = jQuery.Deferred<CreateUserResponse>();

            function tryCreate() {
                jQuery.post(this.host + '/api', message, (data) => {
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
            };

            return def.promise();
        }
    }
}
