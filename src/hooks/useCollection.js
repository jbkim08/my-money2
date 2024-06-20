import { useEffect, useState } from "react";
import { firedb } from "../firebase/config";

export const useCollection = (collection) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ref = firedb.collection(collection);

    const unsub = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(results);
        setError(null);
      },
      (err) => {
        console.log(err);
        setError("데이터를 가져올 수 없습니다.");
      }
    );

    return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { documents, error };
};
