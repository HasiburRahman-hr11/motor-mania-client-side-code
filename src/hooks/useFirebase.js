import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, updateProfile, getIdToken } from "firebase/auth";
import initializeFirebase from "../Firebase/firebase.init";
import axios from 'axios';

// Firebase Initialization
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [token, setToken] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    // Handle Registration
    const firebaseSignUp = (userName, email, password, history) => {
        setLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {

                // Set User to User state
                setUser({
                    email: email,
                    displayName: userName,
                });

                // Save user to Database
                // saveUserToDB(userName, email);

                // Update user profile to Firebase
                updateProfile(auth.currentUser, {
                    email: email,
                    displayName: userName,
                }).then(() => {

                }).catch((error) => {

                });
                setError('');
                history.push('/signin');
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    }

    // Handle Login User
    const firebaseSignIn = (email, password, location, history) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setError('');
                const path = location?.state?.from || '/'
                history.push(path);
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setLoading(false));
    }

    // Handle Log Out
    const firebaseSignOut = () => {
        signOut(auth).then(() => {
            setError('');
            setIsAdmin(false);
        }).catch((error) => {
            setError(error.message);
        });
    }


    // Change User State automatically
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);

                // Set Admin
                // const { data } = await axios.get(`http://localhost:8000/users/${user.email}`);
                // if (data?.role === 'admin') {
                //     setIsAdmin(true);
                // } else {
                //     setIsAdmin(false);
                // }

                // Get Token
                getIdToken(user)
                    .then((idToken) => {
                        setToken(idToken)
                    });
            } else {
                setUser({})
            }
            setLoading(false);
        });

        return () => unsubscribe;
    }, [auth]);


    return {
        user,
        isAdmin,
        token,
        setUser,
        loading,
        setLoading,
        error,
        setError,
        firebaseSignUp,
        firebaseSignIn,
        firebaseSignOut
    }

}

export default useFirebase;