import { db, storage } from "../../../../../../utils/firebase/firebase";
import {
  getDoc,
  doc,
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default async function uploadImage({ image, nickname }: any) {
  const televisionRef = collection(db, "television");
  const storageRef = ref(storage, "television");
  const imageRef = await addDoc(televisionRef, {
    createdAt: serverTimestamp(),
    nickname,
  });
  console.log("19");
  const idRef = ref(
    storageRef,
    `${imageRef.id}_image.${image.type.split("/").pop()}`
  );
  console.log("24");

  try {
    await uploadBytesResumable(idRef, image, {
      contentType: image.type,
    });
  } catch (e) {
    console.log(e);
  }

  console.log("28");
  const imageUrl = await getDownloadURL(idRef);
  const parentChatRef = doc(televisionRef, imageRef.id);
  await updateDoc(parentChatRef, {
    imageUrl: imageUrl,
  });
}
