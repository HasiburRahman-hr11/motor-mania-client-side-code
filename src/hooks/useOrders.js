import { useEffect, useState } from "react";
import axios from 'axios';

const useOrders = () => {

    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getAllOrders = async () => {
            try {
                const { data } = await axios.get('https://motor-mania.herokuapp.com/orders');
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getAllOrders();
    }, []);

    return {
        orders,
        setOrders,
        loading,
        setLoading
    }
}
export default useOrders;