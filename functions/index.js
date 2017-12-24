const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize firebase admin sdk
admin.initializeApp(functions.config().firebase);

exports.createUserAccount = functions.auth.user().onCreate((event) => {
    const user = event.data;
    const uid = user.uid;
    let newUser = {};
    newUser.email = user.email;
    newUser.displayName = user.displayName;
    // If user has no dp make a default one from the firebase storage
    newUser.photoURL = user.photoURL || "https://firebasestorage.googleapis.com/v0/b/letschat-bbbfd.appspot.com/o/default-dp.png?alt=media&token=2508f65b-e1ff-4782-a2c3-7d4c9b04e3d9";

    return admin.firestore().doc(`/users/${uid}`).set(newUser);
});
