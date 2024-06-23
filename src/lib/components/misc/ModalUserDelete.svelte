<script lang="ts">
    import {goto} from "$app/navigation";
    import {user} from "$lib/stores/user-store";

    export let userToDelete: object;

    let error;

    const deleteProfile = async () => {
        const response: Response = await fetch('/api/delete/user?id=' + userToDelete.id, {
            method: 'DELETE',
            headers: {
                accept: 'application/json'
            }
        });

        if (response.status === 204) {
            $user = {};
            goto('/');
        } else {
            error = 'Произошла ошибка';
        }
    }

</script>

<dialog class="modal" id="user_delete_modal">
    <div class="modal-box">
        {#if error}
           <p class="font-bold text-error">Произошла ошибка</p>
        {/if}
        <p>Вы собираетесь удалить профиль <span class="font-bold">{userToDelete.name}</span>. Это действие <span class="font-bold">необратимо</span>!</p>
        <div class="flex justify-between mt-2">
            <a class="btn btn-accent" on:click={deleteProfile}>
                Удалить
            </a>
            <a class="btn btn-error" on:click={() => user_delete_modal.close()}>Не удалять</a>
        </div>
    </div>
</dialog>