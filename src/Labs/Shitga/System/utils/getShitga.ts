import { db } from "../../../../utils/firebase/firebase";
import { getDoc, doc } from "firebase/firestore";

export default async function getShitga() {
  const snapShot = await getDoc(doc(db, "currentSales", "sales"));
  let salesData = snapShot.data()?.sales;

  return salesData;
}
