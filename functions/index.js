const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();

const createNotification = notification => {
  return firestore.collection("notifications").add(notification);
};

exports.projectCreated = functions.firestore
  .document("projects/{projectId}")
  .onCreate(doc => {
    const project = doc.data();
    const notification = {
      content: "Đã tạo mới bảng: " + project.title,
      user: `${project.authorLastName} ${project.authorFirstName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    };

    return createNotification(notification);
  });

exports.projectDeleted = functions.firestore
  .document("projects/{projectId}")
  .onDelete(async doc => {
    const project = doc.data();
    const notification = {
      content: "Đã xoá bảng: " + project.title,
      user: `${project.authorLastName} ${project.authorFirstName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    };

    return Promise.all([
      createNotification(notification),

      firestore
        .collection("records")
        .where("projectId", "==", doc.id)
        .get()
        .then(records => {
          const batch = firestore.batch()

          records.forEach(record => {
            batch.delete(record.ref);
          })

          return batch.commit()
        })
    ]);
  });

exports.recoredCreated = functions.firestore
  .document("records/{recordId}")
  .onCreate(doc => {
    const record = doc.data();
    const notification = {
      content: `Đã thêm nhà cung cấp: ${record.name}, chuyên cung cấp: ${record.product}`,
      user: `${record.authorLastName} ${record.authorFirstName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    };

    return createNotification(notification);
  });

exports.userJoined = functions.auth.user().onCreate(user => {
  return admin
    .firestore()
    .collection("users")
    .doc(user.uid)
    .get()
    .then(doc => {
      const newUser = doc.data();
      const notification = {
        content: "Đã tham gia",
        user: `${newUser.lastName} ${newUser.firstName}`,
        time: admin.firestore.FieldValue.serverTimestamp()
      };

      return createNotification(notification);
    });
});
