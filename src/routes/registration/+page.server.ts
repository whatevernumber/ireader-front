import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {

    if (cookies.get('bearer')) {
        throw redirect(308, '/')
    }
}