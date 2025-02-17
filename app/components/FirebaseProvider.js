"use client"; // Ensure this runs in the browser

import { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebaseConfig";  
import { collection, getDocs } from "firebase/firestore";

const FirebaseContext = createContext();

export function FirebaseProvider({ children }) {
    const storageKey = "firebaseData";
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const cachedData = localStorage.getItem(storageKey);
            if (cachedData) {
                console.log("Using cached Firebase data");
                setData(JSON.parse(cachedData));
                return;
            }

            try {
                console.log("Fetching new Firebase data...");
                const querySnapshot = await getDocs(collection(db, "yourCollection"));
                const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                localStorage.setItem(storageKey, JSON.stringify(fetchedData));
                setData(fetchedData);
            } catch (error) {
                console.error("Error fetching Firebase data:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <FirebaseContext.Provider value={data}>
            {children}
        </FirebaseContext.Provider>
    );
}

export function useFirebaseData() {
    return useContext(FirebaseContext);
}
