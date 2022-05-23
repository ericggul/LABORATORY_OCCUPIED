import { db, storage } from "../../../../../../utils/firebase/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default async function retriveData() {
  const q = query(
    collection(db, "television"),
    where("presented", "==", false)
  );
  const querySnapShot = await getDocs(q);

  let result: any[] = [];
  querySnapShot.forEach((doc: any) => {
    let data = doc.data();
    result.push(data);
  });

  console.log(result);

  return result;
}
