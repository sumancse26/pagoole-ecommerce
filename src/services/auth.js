export const authLogIn = async (data) => {
    const res = await fetch('http://103.125.255.208:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return res;
};

export const authRegister = async (data) => {
    const res = await fetch('http://103.125.255.208:8080/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return res;
};

             