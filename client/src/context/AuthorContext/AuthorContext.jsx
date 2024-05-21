import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthorContext = createContext(null);

const AuthorContextProvider = ({ children }) => {
    const redirect = useNavigate();
    const [username, setUsername] = useState("No username");
    const [login, isLogin] = useState(false);
    const getAuthor = async () => {
        try {
            const response = await axios.get('http://localhost:4000/author');
            if (response.data.status) {
                isLogin(response.data.status)
                setUsername(response.data.author_data.name)
            } else {
                redirect('/login')
            }
        } catch (error) {
            console.error('Error fetching author data:', error);
        }
    };


    useEffect(() => {
        getAuthor();
    }, []);



    return (
        <AuthorContext.Provider value={{ username, login }}>
            {children}
        </AuthorContext.Provider>
    );
};

// Custom hook to use the AuthorContext
const useAuthorContext = () => useContext(AuthorContext);

export { AuthorContextProvider, useAuthorContext };
