import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {

    if (cookies.get('ireader-bearer')) {
        throw redirect(308, '/')
    }
}