export async function load({ cookies }) {

   const authorized: boolean = cookies.get('ireader-bearer') ? true : false;
   const id: string = cookies.get('id') ?? null;

   if (!id && authorized || !authorized && id) {
       cookies.delete('ireader-bearer', {path: '/'});
       cookies.delete('id', {path: '/'});
   }

    return {
        authorized,
        id
    };
}