<script lang="ts">
    import {user} from "$lib/stores/user-store";
    import {refreshUserData} from "$lib/helpers/helpers";
    import { invalidateAll } from '$app/navigation'

    let errors: object;
    $: errors = {}
    let inProgress: boolean = false;

    async function submitForm(evt) {
        evt.preventDefault();
        inProgress = true;

        const form: HTMLFormElement = document.forms.login;
        const data: FormData = new FormData(form);

        let response: Response = await fetch('/api/login', {
            method: 'POST',
            body: data,
        })

        if (response.ok) {
            const result: object = await response.json();
            if (result.errors) {
                inProgress = false;
                errors = result.errors;
            } else {
                invalidateAll();
                let userData: object = await refreshUserData(result.user.id);
                if (userData) {
                    $user = userData;
                    login_modal.close();
                }
            }
        }
}
</script>

<dialog id="login_modal" class="modal">
    <div class="modal-box relative">
        <div class="absolute top-0 right-0">
            <img class="btn btn-xs btn-ghost btn-square" src="/img/svg/cancel-delete.svg" on:click={() => {login_modal.close()}} alt="Крестик">
        </div>
        {#if inProgress}
            <p class="text-lg text-accent">Идёт загрузка...</p>
        {:else}
        <form name="login" class="flex flex-col items-center gap-y-4 m-auto w-[300px]">
            <label class="input input-bordered flex items-center gap-2 w-full {errors.email ? 'input-error' : ''}">
                <span>Почта</span>
                <input type="email" name="email" required>
            </label>
            {#if errors.email}
            <span class="text-sm text-accent">{errors.email[0]}</span>
            {/if}
            <label class="input input-bordered flex items-center gap-2 w-full flex {errors.password ? 'input-error' : ''}">
                <span>Пароль</span>
                <input type="password" name="password" required>
            </label>
            {#if errors.password}
            <span class="text-sm text-error">{errors.password[0]}</span>
            {/if}
            <div>
                <button class="btn btn-primary" type="submit" on:click={submitForm}>Войти</button>
            </div>
        </form>
        {/if}
    </div>
</dialog>