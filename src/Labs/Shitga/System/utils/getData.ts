import { db } from "../../../../utils/firebase/firebase";
import { getDoc, doc } from "firebase/firestore";

export async function getCurrency() {
  const snapShot = await getDoc(doc(db, "currentSales", "pound"));
  let yesterday = snapShot.data()?.yesterday;
  let today = snapShot.data()?.today;
  return { yesterday, today };
}
export async function getBitcoin() {
  const snapShot = await getDoc(doc(db, "currentSales", "bitcoin"));
  let yesterday = snapShot.data()?.yesterday;
  let today = snapShot.data()?.today;
  return { yesterday, today };
}
export async function getNasdaq() {
  const snapShot = await getDoc(doc(db, "currentSales", "nasdaq"));
  let yesterday = snapShot.data()?.yesterday;
  let today = snapShot.data()?.today;
  return { yesterday, today };
}
