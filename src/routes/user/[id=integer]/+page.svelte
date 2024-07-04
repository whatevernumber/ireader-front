<script lang="ts">
    import { user } from "$lib/stores/user-store";
    import ModalUserDelete from "$lib/components/misc/ModalUserDelete.svelte";
    import {PUBLIC_AVATARS} from "$env/static/public";
    import SmallBookCard from "../../../lib/components/card/SmallBookCard.svelte";

    export let data: object;

    const currentUser: object = data.user.data;

    let age: number;
    let error: string;

    if (currentUser.birthday) {
        const yearInMs = 3.15576e+10;
        age = Math.floor((new Date() - new Date(currentUser.birthday).getTime()) / yearInMs) //
    }

</script>

<svelte:head>
    <title>{currentUser.name}</title>
</svelte:head>

<div class="bg-base-200 shadow-xl w-[300px] sm:w-[500px] m-auto mb-8 min-h-32 p-8">
    <div class="flex justify-between flex-col gap-y-2 sm:gap-y-0 sm:flex-row">
        <div>
            {#if currentUser.avatar}
                <div class="avatar">
                    <div class="w-24 rounded">
                        <img src={PUBLIC_AVATARS + currentUser.avatar} />
                    </div>
                </div>
            {/if}
            <p class="text-sm font-bold"> Имя пользователя:</p>
            <p>{currentUser.name}</p>
            {#if $user.currentUser && $user.currentUser.data.id === currentUser.id}
            <p class="text-sm font-bold"> Почтовый ящик:</p>
            <p>{currentUser.email}</p>
            {/if}
            <p class="text-sm font-bold"> Дата рождения:</p>
            <p>{currentUser.birthday}</p>
            {#if age}
            <p class="text-sm font-bold">Возраст</p>
            <p>{age}</p>
            {/if}
        </div>
        <div class="flex flex-col gap-y-4 justify-between">
            <div class="stats shadow">
                <div class="stat">
                    <div class="stat-title">Прочитано книг</div>
                    <div class="stat-value text-primary">{currentUser.completed_count ?? 0}</div>
                </div>
            </div>
            {#if $user.currentUser && $user.currentUser.data.id === currentUser.id}
            <div class="flex flex-col gap-y-6">
                <a href={currentUser.id + '/edit'} class="btn btn-xs">Редактировать профиль</a>
                <button on:click={() => user_delete_modal.showModal()} class="btn btn-xs btn-error">Удалить профиль</button>
            </div>
            {/if}
        </div>
    </div>
</div>

<div class="w-4/5 m-auto mb-8 p-4">
    {#if currentUser.progress.length}
        <div class="mt-4">
            <h2 class="text-center text-accent-content mb-6">Сейчас читает:</h2>
            <div class="flex flex-col items-center justify-center gap-y-6 gap-x-6 sm:flex-row">
                {#each currentUser.progress as book, index}
                    {#if index < 5}
                    <SmallBookCard {book} />
                    {/if}
                {/each}
            </div>
        </div>
    {/if}
</div>

<ModalUserDelete userToDelete={currentUser}/>