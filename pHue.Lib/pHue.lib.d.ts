declare module Hue {
    class CreateUserResponse {
        public username: string;
    }
    class HueClient {
        private host;
        private username;
        private lightsApi;
        constructor(host: string, username?: string);
        public lights(): Lights.LightsApi;
        public setUserName(username: string): void;
        public createUser(deviceType: string, userName: string): JQueryPromise<CreateUserResponse>;
    }
}
declare module Hue.Lights {
    class LightEntry {
        public name: string;
    }
    class LightsApi {
        private host;
        private username;
        constructor(host: string, username: string);
        public all(): JQueryPromise<LightEntry[]>;
    }
}
