const functions = require("firebase-functions");
const admin = require("firebase-admin");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generateApiKey(uid) {
    const db = admin.firestore();
    db.doc('merchants/' + uid).set({
        name: "",
        logo: "",
        apikey: makeid(64)
    })
    .then(() => {
        return true;
    })
    .catch((reason) => {
        console.error(reason);
        sleep(2000);
        onUserCreate(user);
    });
}

function onUserCreate(user) {
    generateApiKey(user.uid);
}

exports.regenerateApiKey = functions.https.onCall((data, context) => {
    if (context != undefined) {
        generateApiKey(context.auth.uid);
    }
})

exports.onUserCreate = functions.auth.user().onCreate((user) => {
    onUserCreate(user);
});

