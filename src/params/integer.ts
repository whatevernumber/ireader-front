/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param): boolean {
    return /^\d+$/.test(param);
}