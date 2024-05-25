import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthorContext = createContext(null);

const AuthorContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [userinfo, setUserinfo] = useState({ author_id: null, name: "No username" });
    const [login, setLogin] = useState(false);

    axios.defaults.withCredentials = true;

    const getAuthor = async () => {
        try {
            const response = await axios.get('http://localhost:4000/author/');
            if (response.data.status) {
                setLogin(response.data.status);
                const { author_id, name } = response.data.author_data;
                setUserinfo({ author_id, name });
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error fetching author data:', error);
        }
    };

    useEffect(() => {
        getAuthor();
    }, []);

    return (
        <AuthorContext.Provider value={{ userinfo, login }}>
            {children}
        </AuthorContext.Provider>
    );
};

// Custom hook to use the AuthorContext
const useAuthorContext = () => useContext(AuthorContext);

export { AuthorContextProvider, useAuthorContext };