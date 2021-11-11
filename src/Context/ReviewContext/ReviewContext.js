import { createContext } from "react";
import useReviews from "../../hooks/useReviews";


export const ReviewContext = createContext();

const ReviewContextProvider = ({ children }) => {
    const allContext = useReviews();
    return (
        <ReviewContext.Provider value={allContext}>
            {children}
        </ReviewContext.Provider>
    )
}

export default ReviewContextProvider;