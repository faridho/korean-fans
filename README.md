# Korean Fans

🇰🇷 Korean Fans is a user generated content platform for big fans of K[Drama, POP, Food, Culture]. Integrate with Full Firebase like:

1. Authentication
2. Cloud Firestore
3. Cloud Storage

# Screnshoot

![alt_text](screenshoot/kf.png)

## Installation
```
npm install
```

## Run On Development
```
npm run serve
```

## Run To Build
```
npm run build
```
## Code Snipet

This below is a snipet about how to use your application to integrate Google & Facebook Authentication
```
methods: {
  async authentcationFirebase(provider) {
        const db = firebase.firestore();

        //To sign in with a pop-up window,
        const getPayload = await firebase
          .auth()
          .signInWithPopup(provider)
          .then(result => {
            const user = {
              name: result.user.displayName,
              email: result.user.email,
              photoUrl: result.user.photoURL,
              emailVerified: result.user.emailVerified,
              uid: result.user.uid,
              status: 0,
              bio: null,
              registerDate: Date.now()
            };
            return user;
          })
          .catch(error => {
            var errorMessage = error.message;
            console.log(errorMessage);
          });

        const uid = new Promise(resolve => {
          db.collection("koreanUsers")
            .where("uid", "==", getPayload.uid)
            .get()
            .then(querySnapshot => {
              if (querySnapshot.empty) {
                resolve(querySnapshot.empty);
              }
            })
            .catch(error => {
              console.log(error);
            });
        });

        uid.then(val => {
          if (val) {
            db.collection("koreanUsers")
              .add(getPayload)
              .then(docRef => {
                console.log(docRef);
              })
              .catch(error => {
                console.log(error);
              });
          }
        });
      },

      authGoogleFirebase() {
        this.isLoading = true;
        //instance
        const provider = new firebase.auth.GoogleAuthProvider();
        this.authentcationFirebase(provider);
        this.isLoading = false;
      },

      authFacebookFirebase() {
        this.isLoading = true;
        //instance
        const provider = new firebase.auth.FacebookAuthProvider();
        this.authentcationFirebase(provider);
        this.isLoading = false;
      },

      logOut() {
        this.isLoading = true;
        firebase
          .auth()
          .signOut()
          .then(function() {})
          .catch(function(error) {
            alert(error);
          });
        this.dialog = false;
        this.isLoading = false;
      }
}
```




