interface User {
    name: string,
    email: string,
    birthday?: string,
}

// gets given user data from the server and returns it
export async function refreshUserData(id: string): Promise<object> {

    let userData = {
        currentUser: null,
        favs: null,
        purchases: null,
        cart: null,
    };
    let response = await fetch('/api/user?id=' + id, {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    });

    if (response.ok) {
        userData.currentUser = await response.json();
    }

    response = await fetch('/api/user/cart', {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    });

    if (response.ok) {
        userData.cart = await response.json();
    }

    response = await fetch('/api/user/favs', {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    });

    if (response.ok) {
        userData.favs = await response.json();
    }

    response = await fetch('/api/user/purchases', {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    });

    if (response.ok) {
        userData.purchases = await response.json();
    }

    return userData;
}

export function clearEmptyData(data: FormData): FormData {
    for(let [key, value]: string of data.entries()) {
        if (!value) {
            data.delete(key);
        }
    }
    return data;
}

// adds new fields from given object to the FormData
export function appendArrayToFormData(data: object, key: string, formData: FormData): FormData {
    for(let element: string of data) {
        formData.append(`${key}[]`, element);
    }

    return formData;
}