import { db, storage } from "../../../../../../utils/firebase/firebase";
import {
  getDocs,
  doc,
  collection,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

export default async function retriveData() {
  const q = query(
    collection(db, "television"),
    where("presented", "==", false)
  );

  let item = null;
  try {
    const querySnapShot = await getDocs(q);

    let result: any[] = [];

    await querySnapShot.forEach((doc: any) => {
      if (doc && doc.id) {
        let data = doc.data();
        result.push({ ...data, id: doc.id });
      }
    });
    result = result.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
    item = result.length > 0 ? result[0] : null;

    //get image from item
    await updateDoc(doc(db, "television", item.id), {
      presented: true,
    });
  } catch (e) {
    console.log(e);
  }

  return item || null;
}
