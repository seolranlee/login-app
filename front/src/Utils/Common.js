export const getUser = () => {
    const userStr = sessionStorage.getItem('email');
    if(userStr) return JSON.parse(userStr);
    else return null;
}

export const getToken = () => {
    return sessionStorage.getItem('token') || null;
}

export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
}

export const setUserSession = (token, email) => {
    sessionStorage.setItem('token',token);
    sessionStorage.setItem('email',JSON.stringify(email));
}