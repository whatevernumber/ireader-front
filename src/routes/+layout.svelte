<script lang="ts">
	import {beforeUpdate, onMount} from 'svelte';
	import {user} from "$lib/stores/user-store";
	import Header from '$lib/components/Header.svelte';
	import {refreshUserData} from '$lib/helpers/helpers.ts';
	import '../app.css';

	export let data: object;

	onMount(async () => {
		if (data.authorized) {
			const userId: string = localStorage.getItem('id');

			if (userId && !$user.currentUser) {
				$user = await refreshUserData(userId);
			}
		} else {
			localStorage.removeItem('id');
			$user = {};
		}
	});

</script>

<Header />

<main>
	<slot />
</main>

<footer class="footer mt-auto h-12 bg-base-200 flex items-center">
	<p class="ml-auto pr-4">
		<a class="text-xs" href="https://github.com/whatevernumber" target="_blank" >
			<img src="/img/svg/github.svg" class="w-8">
		</a>
	</p>
</footer>