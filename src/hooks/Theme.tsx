import { useEffect, useState } from "react";

const Theme = ({key, defaultTheme}:{key: string, defaultTheme: string}) => {
    const [theme, setTheme] = useState(() => {

        let currentTheme;

        try{
            currentTheme = JSON.parse(localStorage.getItem(key) || JSON.stringify(defaultTheme));
        }catch (error) {
            currentTheme = defaultTheme;
        }finally{
            console.log(currentTheme);
            return currentTheme;
        }
    });

    useEffect(() => {
        console.log(theme);
        localStorage.setItem(key, JSON.stringify(theme));
    }, [key, theme])


  return [theme, setTheme];
}

export default Theme
