const myStorage = window.localStorage;

export const getUser = () => {
    const userStr = myStorage.getItem('email');
    if(userStr) return JSON.parse(userStr);
    else return null;
}

export const getToken = () => {
    return myStorage.getItem('token') || null;
}

export const removeUserSession = () => {
    myStorage.removeItem('token');
    myStorage.removeItem('email');
}

export const setUserSession = (token, email) => {
    myStorage.setItem('token',token);
    myStorage.setItem('email',JSON.stringify(email));
}