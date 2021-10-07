// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // BANCO COOPEROESTE LOCAL
  // firebase: {
  //   apiKey: "AIzaSyCc43R9B_BFr4FlZWnrUEHzDnXZkqHMoV4",
  //   authDomain: "agendador-672a8.firebaseapp.com",
  //   projectId: "agendador-672a8",
  //   storageBucket: "agendador-672a8.appspot.com",
  //   messagingSenderId: "411830671192",
  //   appId: "1:411830671192:web:64c48208f97a9b1dcdf72d",
  //   measurementId: "G-72MKK3E9F1"
  // },
  firebase: {
    apiKey: "AIzaSyAAEf64DEmubvJJW6db2FQQP8097qLjwQ0",
    authDomain: "agendador-93713.firebaseapp.com",
    projectId: "agendador-93713",
    storageBucket: "agendador-93713.appspot.com",
    messagingSenderId: "183668652304",
    appId: "1:183668652304:web:cd616e3b69a287a6bdcd95",
    measurementId: "G-HQ1D5M53GH"
  },
  // apiUrl: 'http://187.6.254.130:8181'
  // apiUrl: 'http://orionagrotitan.viasoft.com.br:38081'
  apiUrl: 'http://localhost:38081'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
