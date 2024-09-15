// Creating userReducer here for the user's actions
// Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

// Local Imports
import { db } from "../../Database/firebaseConfig";

// For firebase to check authentication auth variable created.
const auth = getAuth();

// Creating asyncThunk for the async functions here.
// Async thunk to handle user signUp here.
export const signUpAsync = createAsyncThunk("users/signUp", async ({ name, email, password }, { dispatch }) => {
    try {
        // Perform signup
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;

        // Update user profile with additional data
        await updateProfile(user, {
            name
        });

        // Save user details to the database
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            email: user.email,
        });

        // Notification
        toast.success('User signed up successfully!');

    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
}
);

// Async thunk for the user signIn here.
export const signInAsync = createAsyncThunk("users/signIn", async ({ email, password }, { dispatch }) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success('User signed in successfully!');
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
});

// Async thunk for logout the user
export const logoutAsync = createAsyncThunk("users/logout", async () => {
    try {
        await signOut(auth);
        toast.success('User signed out successfully!');
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
});


// Initial State
const INITIAL_STATE = {
    signedUser: null,
    isSignIn: false,
    loading: false
}

// Creating user slice here
export const userSlice = createSlice({
    name: "users",
    initialState: INITIAL_STATE,
    reducers: {
        // Checking if user sign in in firebase and setting state
        verifyUserSignIn: (state, action) => {
            state.signedUser = action.payload.user;
            state.isSignIn = action.payload.signIn;
        },
        signInActionCalled: (state, action) => {
            state.loading = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signUpAsync.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(signInAsync.fulfilled, (state, action) => {
            state.loading = false;
        });
    }
});

// Extracting userReducer from the slice
export const userReducer = userSlice.reducer;

// Extracting actions from the slice here.
export const { verifyUserSignIn, signInActionCalled } = userSlice.actions;

// Getting state from the userReducer
export const userSelector = (state) => state.userReducer;