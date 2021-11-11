import { useEffect, useState } from "react";
import axios from 'axios';

const useProducts = () => {
    const [bikes, setBikes] = useState([]);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const getAllBikes = async () => {
            try {
                const { data } = await axios.get('https://motor-mania.herokuapp.com/products');
                setBikes(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getAllBikes();
    }, []);

    return {
        bikes,
        setBikes,
        loading,
        setLoading
    }
}
export default useProducts;