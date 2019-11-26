# TABLE APP

### Testing
https://test-firebase-f3a3b.firebaseapp.com

### Config

src/config/fbConfig.js

```
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
const devConfig = {
  // Your dev config
};

const productConfig = {
  // Your product config
};

const firebaseConfig = process.env.NODE_ENV === "production" ? productConfig : devConfig

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ });

export default firebase 
```

### Database rules

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    function isSignedIn() {
      return request.auth != null;
    }

    function getRole(rsc) {
      return rsc.data.roles[request.auth.uid];
    }

    function isOneOfRoles(rsc, array) {
      return isSignedIn() && (getRole(rsc) in array);
    }

    function onlyContentChanged() {
      return request.resource.data.roles == resource.data.roles
        && request.resource.size() == resource.size();
    }
    
    match /projects/{project} {
    // Split writing into creation, deletion, and updating. Only an
    // owner can create or delete a project but a writer can update
    // project content.
      allow create: if isSignedIn();
      allow delete: if isOneOfRoles(resource, ['owner']);
      allow update: if isOneOfRoles(resource, ['owner'])
                  || (isOneOfRoles(resource, ['writer']) && onlyContentChanged());
      // allow get: if isOneOfRoles(resource, ['owner', 'writer', 'commenter', 'reader']);
      // allow list: if isSignedIn();
      allow read: if isSignedIn();

    }
   
    match /records/{record} { 
    	allow read: if isSignedIn();
    	allow create: if isSignedIn();
      allow delete: if isOneOfRoles(resource, ['owner'])
      allow update: if isOneOfRoles(resource, ['owner']) && onlyContentChanged()
    }
      
    match /users/{userId}{
    	allow create
      allow read: if request.auth.uid != null
      allow write: if request.auth.uid == userId
    }
    match /notifications/{notification}{
    	allow read, write: if request.auth.uid != null
    }
  }
}
```