import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.entasiradio.app",
  appName: "Entasi Radio",
  webDir: "out",
  bundledWebRuntime: false,
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav",
    },
  },
  // server: {
  //   url: "http://147.27.123.117:8100",
  //   cleartext: true,
  // },
    android: {
       buildOptions: {
          keystorePath: '/Users/vskevakis/Documents/AndroidStudio/keystone',
          keystoreAlias: 'key0',
       }
    }
  };

export default config;
