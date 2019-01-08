import firebase from 'firebase'; 

var config = {
                apiKey: "AIzaSyCoRZ6hK9rNkFUrjzDBRjpJeUlWWWyNVu8",
                authDomain: "wartube.firebaseapp.com",
                databaseURL: "https://wartube.firebaseio.com",
                projectId: "wartube",
                storageBucket: "wartube.appspot.com",
                messagingSenderId: "319911316921"
              };
      let app=firebase.initializeApp(config);
      export const db=app.database();
      export const auth=app.auth();
      export const store=app.storage();