export async function load({ cookies }) {

   const authorized: boolean = cookies.get('bearer') ? true : false;
   const id: string = cookies.get('id') ?? null;

   if (!id && authorized) {
       cookies.delete('bearer', {path: '/'});
       cookies.delete('id', {path: '/'});
   }

    return {
        authorized,
        id
    };
}