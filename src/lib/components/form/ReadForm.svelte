<script lang="ts">
    import { goto } from '$app/navigation';

    export let book: object;

    console.log(book);

    let errors: object;
    $: errors = [];

    let stars: object = ['', '', '', '', ''];
    let marked: number;

    async function submitForm(evt) {
        evt.preventDefault();

        const form: HTMLFormElement = document.forms.review;
        const data: FormData = new FormData(form);

        data.append('rate', marked.toString());

        let response: Response = await fetch('/api/book/feedback?isbn' + isbn, {
            method: 'POST',
            body: data,
        })

        const result: object = await response.json();

        if (result.errors) {
            errors = result.errors;
        } else {
            goto('/books/completed');
        }
    }
</script>

<div>
    <form name="review" class="p-4 flex flex-col gap-y-4 m-auto justify-center w-[300px] sm:w-[500px]">
        <label class="flex flex-col gap-y-2">
            <span>Здесь вы можете оставить отзыв о прочитанной книге. Это необязательно.</span>
            <textarea name="comment" rows="10" class="textarea textarea-primary textarea-lg {errors.comment ? 'input-error' : ''} w-full"></textarea>
            {#if errors.comment}
                {#each errors.comment as error}
                    <p class="text-sm text-error">{error}</p>
                {/each}
            {/if}
        </label>
        <label>
            <ul class="flex justify-center">
                {#each stars as star, index}
                    <li class="star first-star flex" on:click={() => marked = index}>
                        {#if index <= marked}
                            <img class="w-14" src="/img/svg/star-colored.svg" alt="Закрашенная звёздочка">
                        {:else}
                            <img class="w-14" src="/img/svg/star-trans.svg" alt="Незакрашенная звёздочка">
                        {/if}
                    </li>
                {/each}
            </ul>
        </label>
        <div class="flex justify-center gap-x-3">
            <submit class="btn btn-primary" on:click={submitForm}>
                Сохранить
            </submit>
            <a class="btn btn-accent" on:click={redirectToCompleted}>
                Не оставлять отзыв
            </a>
        </div>
    </form>
</div>


