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
// components/TheAccount.vue

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
Below is code snipet how to use Storage and input to Firestore 

```
// views/Create/index.vue

methods: {
  async publishContenClicked() {
      this.publishLoading = true;
      const file = this.form.thumbnail;
      const newFileName = uuidv4();
      const metadata = {
        contentType: "image/jpeg"
      };
      const storage = firebase.storage();
      const storageRef = storage.ref();
      const db = firebase.firestore();

      try {
        const putImage = storageRef
          .child(`thumbnails/${newFileName}`)
          .put(file, metadata);

        putImage.on(
          "state_changed",
          snapshot => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED:
                console.log("Upload is paused");
                break;
              case firebase.storage.TaskState.RUNNING:
                console.log("Upload is running");
                break;
            }
          },
          error => {
            console.log(error);
          },
          () => {
            putImage.snapshot.ref.getDownloadURL().then(async downloadURL => {
              const payload = {
                categories: this.form.selectedCategories,
                contentText: this.form.contentText,
                createdById: this.user.data.userId,
                tags: this.form.selectedTags,
                thumbnail: downloadURL,
                title: this.form.title,
                postedDate: Date.now()
              };

              const docId = await db
                .collection("koreanArticles")
                .add(payload)
                .then(docRef => {
                  return docRef.id;
                })
                .catch(function(error) {
                  alert(error);
                });

              if (docId) {
                this.publishLoading = false;
                this.$router.push({ path: `/detail/${docId}` });
              }
            });
          }
        );
      } catch (error) {
        alert(error);
      }
    }
}
```

And below is how to read data from firestore
```
// views/Home/components/Content/components/Articles.vue

methods: {
  async getArticles() {
      const db = firebase.firestore();
      const articles = await db
        .collection("koreanArticles")
        .orderBy("postedDate", "desc")
        .get()
        .then(querySnapshot => {
          let articles = [];
          querySnapshot.forEach(doc => {
            articles.push({
              id: doc.id,
              createdById: doc.data().createdById,
              thumbnail: doc.data().thumbnail,
              title: doc.data().title,
              contentTex: doc.data().contentText.substr(0, 80),
              postedDate: doc.data().postedDate
            });
          });
          return articles;
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });

      let dataArticles = [];
      for (const article of articles) {
        const userId = article.createdById;

        const user = new Promise(resolve => {
          const docRef = db.collection("koreanUsers").doc(userId);
          docRef.get().then(doc => {
            if (doc.exists) {
              resolve(doc.data());
            }
          });
        });

        user.then(userData => {
          dataArticles.push({
            userId: article.createdById,
            by: userData.name,
            avatar: userData.photoUrl,
            id: article.id,
            thumbnail: article.thumbnail,
            title: article.title,
            text: article.contentTex,
            created: article.postedDate
          });
        });
      }

      this.articles = dataArticles;
    },
}
```



