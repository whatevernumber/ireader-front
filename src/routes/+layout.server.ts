export async function load({ cookies }) {

   const authorized: boolean = cookies.get('bearer') ? true : false;

    return {
        authorized
    };
}