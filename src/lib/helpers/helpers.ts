// gets given user data from the server and returns it
export async function refreshUserData(id: string) {

    let userData = {
        currentUser: null,
        favs: null,
        completed: null,
        progress: null,
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

    response = await fetch('/api/user/progress', {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    });

    if (response.ok) {
        userData.progress = await response.json();
    } else {
        return false;
    }

    response = await fetch('/api/user/favs', {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    });

    if (response.ok) {
        userData.favs = await response.json();
    } else {
        return false;
    }

    response = await fetch('/api/user/completed', {
        method: 'GET',
        headers: {
            accept: 'application/json',
        }
    });

    if (response.ok) {
        userData.completed = await response.json();
    } else {
        return false;
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

// loads user's data by the given page
export async function loadMoreBooks(page: number, path: string): Promise<object | boolean> {
    let result: object|boolean = false;

    if (path !== 'books') {
        path = 'user/' + path
    }

    let res: Response = await fetch('/api/' + path + '?page=' + page , {
        method: 'GET',
    });

    if (res.status === 200) {
        result = await res.json();
    }

    return result ?? false;
}

// formats date
export const formatDate = (stringDate: string) => {
    const date = new Date(stringDate);
    return date.getDate() + '.' + date.getMonth() + '.' + date.getFullYear();
}