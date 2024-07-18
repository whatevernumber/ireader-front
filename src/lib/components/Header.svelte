<script lang="ts">
    import Search from "./misc/Search.svelte";
    import {goto} from '$app/navigation';
    import {user} from "$lib/stores/user-store";
    import { page } from '$app/stores';
    import LoginForm from "$lib/components/form/LoginForm.svelte";
    import {PUBLIC_AVATARS} from "$env/static/public";

    let loggedIn: boolean = false;
    let showAuth: boolean = false;
    $: loggedIn = $user.currentUser ? true : false;

    setTimeout(() => showAuth = true, 500);

    const logout = async (): Promise<void> => {
        const response: Response = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                accept: 'application/json'
            }
        });

        if (response.status === 200) {
            $user = {};
            goto('/');
        }
    }

    const changeTheme = () => {
        let theme: string = document.documentElement.getAttribute('data-theme');
        let newTheme: string = '';

        if (theme === 'fantasy') {
            newTheme = 'nord';
        } else {
            newTheme = 'fantasy';
        }
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

</script>

<div role="alert" class="alert alert-info h-2 flex rounded-none">
    <span class="text-xs">На сайте используются cookies.</span>
</div>
<header class="flex justify-between items-center bg-base-200 h-16 px-16 py-0 mb-4">
    <div class="flex items-center gap-x-4">
        <a href="/" class="hover:text-accent flex items-center">
            <img class="w-[60px] rounded-full" src="/img/logo.jpg" alt="Логотип с читающим котиками">
            <p class="ml-2 hidden sm:inline">iBook</p>
        </a>
        <a class="btn btn-xs" on:click={changeTheme}>
            <span class="hidden lg:inline">Сменить тему</span>
            <img src="/img/svg/paint-bucket.svg" class="w-4"/>
        </a>
    </div>
{#if showAuth}
    {#if loggedIn}
    {#if $page.url.pathname !== '/'}
        <div class="hidden sm:block flex mb-[10px]">
            <Search type="header" />
        </div>
    {/if}
    <div class="flex flex-col items-center">
        <nav class="flex gap-x-5">
            {#if $user.currentUser && $user.currentUser?.data?.admin}
                <a href="/admin/books/add" class="btn btn-xs">
                    <span class="hidden lg:inline">Добавить книгу</span>
                    <img src="/img/svg/book-add.svg" class="w-4"/>
                </a>
            {/if}
            <a class="btn btn-accent btn-xs" href='/books/favs'>
                <span class="hidden lg:inline">Хочу прочитать</span>
                <img src="/img/svg/star.svg" class="w-4"/>
            </a>
            <a class="btn btn-success btn-xs" href='/books/completed'>
                <span class="hidden lg:inline">Прочитано</span>
                <img src="/img/svg/book-check-trans.svg" class="w-4"/>
            </a>
            <a class="btn btn-primary btn-xs" href={'/books/progress'}>
                <span class="hidden lg:inline">На чтении</span>
                <img src="/img/svg/book-open.svg" class="w-4"/>
                {#if $user.progress?.data && $user.progress.data.length}
                <span class="hidden lg:inline">{$user.progress.data.length}</span>
                {/if}
            </a>
            <a class="btn btn-xs bg-accent-content/30" href={`/user/${$user.currentUser?.data.id}`}>
                <span class="hidden lg:inline">Профиль</span>
                <img src={$user.currentUser?.data.avatar ? PUBLIC_AVATARS + $user.currentUser.data.avatar : '/img/svg/book-user.svg'} class="w-4"/>
            </a>
            <a class="btn btn-xs btn-error" on:click={logout}>
                <span class="hidden lg:inline">Выйти</span>
                <img src="/img/svg/leave-icon.svg" class="w-4"/>
            </a>
        </nav>
    </div>
    {:else}
        <div class="flex gap-x-2 ml-auto pr-4">
            <button class="btn btn-accent btn-sm" on:click={() => login_modal.showModal()}>Войти</button>
            <a class="btn btn-secondary btn-sm" href="/registration">Зарегистрироваться</a>
        </div>
    {/if}
{/if}
</header>
<LoginForm />
