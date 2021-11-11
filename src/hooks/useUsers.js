import { useEffect, useState } from "react";
import axios from 'axios';

const useUsers = () => {

    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getAllOrders = async () => {
            try {
                const { data } = await axios.get('https://motor-mania.herokuapp.com/users');
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        getAllOrders();
    }, []);

    return {
        users,
        setUsers,
        loading,
        setLoading
    }
}
export default useUsers;