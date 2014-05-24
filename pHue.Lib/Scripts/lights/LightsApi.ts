module Hue.Lights {
    export class LightEntry {
        name: string;
    }

    export class LightsApi {
        private host: string;
        private username: string;

        constructor(host: string, username: string) {
            this.host = host;
            this.username = username;
        }

        all() : JQueryPromise<Array<LightEntry>> {
            return jQuery.getJSON(this.host + '/api/' + this.username + '/lights');
        }
    }
}