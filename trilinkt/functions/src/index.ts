import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import 'firebase/firestore';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

function makeid(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
    }
    return result;
}

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// WARNING: This function will run infinitely until the task succeeds!
// Avoid for all but the most critical of tasks
function exponentialBackoff(task: Promise<any>, ms = 2000) {
    let done = false;

    while(!done) {
        task
        .then((value: any) => {
            done = true;
            return value;
        })
        .catch((reason: any) => {
            console.error(reason);
            sleep(ms);
            exponentialBackoff(task, ms + 2000);
        })
    }
}

exports.onUserCreate = functions.auth.user().onCreate((user) => {
    const db = admin.firestore();
    exponentialBackoff(
        db.doc('merchants/' + user.uid).set({
            name: "",
            logo: "",
            apikey: makeid(64)
        })
    );
    
});