// useGetData.js
import { useEffect, useState } from 'react';
import { db } from '../firebase.config'; // Verify this import path
import { collection, onSnapshot } from 'firebase/firestore';

const useGetData = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const collectionRef = collection(db, collectionName);

  useEffect(() => {
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const fetchedData = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
      setData(fetchedData);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup the subscription
  }, [collectionName]);

  return { data, loading };
}

export default useGetData;
