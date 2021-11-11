import { useEffect, useState } from "react";
import axios from 'axios';

const useReviews = () => {

    const [loading, setLoading] = useState(true);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const getAllReviews = async () => {
            try {
                const { data } = await axios.get('http://localhost:8000/reviews');
                setReviews(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getAllReviews();
    }, []);

    return {
        reviews,
        setReviews,
        loading,
        setLoading
    }
}
export default useReviews;