<script lang="ts">
    import { user } from "$lib/stores/user-store";
    import ModalUserDelete from "$lib/components/misc/ModalUserDelete.svelte";
    import BookCard from "$lib/components/card/BookCard.svelte";

    export let data: object;

    const currentUser: object = data.user.data;

    let age: number;
    let error: string;

    if (currentUser.birthday) {
        const yearInMs = 3.15576e+10;
        age = Math.floor((new Date() - new Date(currentUser.birthday).getTime()) / yearInMs) //
    }

</script>

<div class="bg-base-200 shadow-xl w-[300px] sm:w-[500px] m-auto min-h-32 p-8">
    <div class="flex justify-between flex-col gap-y-2 sm:gap-y-0 sm:flex-row">
        <div>
            <p class="text-sm font-bold"> Имя пользователя:</p>
            <p>{currentUser.name}</p>
            <p class="text-sm font-bold"> Почтовый ящик:</p>
            <p>{currentUser.email}</p>
            <p class="text-sm font-bold"> Дата рождения:</p>
            <p>{currentUser.birthday}</p>
            {#if age}
            <p class="text-sm font-bold">Возраст</p>
            <p>{age}</p>
            {/if}
        </div>
        <div class="flex flex-col gap-y-4">
            <a class="btn btn-accent btn-xs">
                Прочитано книг <span>{currentUser.finishedBooks_count ?? 0}</span>
            </a>
            {#if $user.currentUser && $user.currentUser.data.id === currentUser.id}
            <a href={currentUser.id + '/edit'} class="btn btn-xs">Редактировать профиль</a>
            <button on:click={() => user_delete_modal.showModal()} class="btn btn-xs btn-error">Удалить профиль</button>
            {/if}
        </div>
    </div>
    <div class="mt-4">
        <h2 class="text-center text-accent-content">Сейчас читает:</h2>
        {#if currentUser.progress}
            {#each $user.progress.data as book}
                <BookCard {book} />
            {/each}
        {/if}
    </div>
</div>

<ModalUserDelete userToDelete={currentUser}/>