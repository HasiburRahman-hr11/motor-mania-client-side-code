import { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, updateProfile, getIdToken } from "firebase/auth";
import initializeFirebase from "../Firebase/firebase.init";
import axios from 'axios';
import { successNotify, errorNotify } from '../utils/toastify'

// Firebase Initialization
initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(false);
    const [error, setError] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [token, setToken] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    // Handle Registration
    const firebaseSignUp = (userName, email, password, location, history) => {
        setLoading(true);
        setProgress(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {

                // Set User to User state
                setUser({
                    email: email,
                    displayName: userName,
                });

                // Save user to Database
                saveUserToDB(userName, email);

                // Toast Notification
                successNotify('Account Created Successfully!')

                // Update user profile to Firebase
                updateProfile(auth.currentUser, {
                    email: email,
                    displayName: userName,
                }).then(() => {

                }).catch((error) => {

                });
                setError('');
                const path = location?.state?.from || '/'
                history.push(path);
            })
            .catch((error) => {
                setError(error.message);
                errorNotify(error.message);
            })
            .finally(() => {
                setLoading(false);
                setProgress(false);
            });
    }

    // Handle Login User
    const firebaseSignIn = (email, password, location, history) => {
        setLoading(true);
        setProgress(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setError('');
                const path = location?.state?.from || '/'
                history.push(path);
            })
            .catch((error) => {
                setError(error.message);
                errorNotify(error.message);
            })
            .finally(() => {
                setLoading(false);
                setProgress(false);
            });
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

    // Save User to Database
    const saveUserToDB = async (userName, email) => {
        try {
            const { data } = await axios.post('https://motor-mania.herokuapp.com/users/create', { userName, email });

        } catch (error) {
            console.log(error);
        }
    }


    // Change User State automatically
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);

                // Set Admin
                const { data } = await axios.get(`https://motor-mania.herokuapp.com/users/${user.email}`);
                if (data?.role === 'admin') {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }

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
    }, []);


    return {
        user,
        isAdmin,
        token,
        setUser,
        loading,
        setLoading,
        progress,
        setProgress,
        error,
        setError,
        firebaseSignUp,
        firebaseSignIn,
        firebaseSignOut
    }

}

export default useFirebase;