<script lang="ts">
    import {browser} from "$app/environment";

    let showWarning: boolean = false;

    const acceptCookies = () => {
        localStorage.setItem('cookies_accepted', '1');
        showWarning = false;
    }

    if (browser) {
        if (!localStorage.getItem('cookies_accepted')) {
            showWarning = true;
        }
    }
</script>

{#if showWarning}
<div class="fixed bottom-0 md:bottom-4 right-4">
    <div class="flex flex-col justify-center items-center w-full md:w-[500px] h-[150px] bg-yellow-100 rounded-xl shadow-[5px_5px_10px_#2196f350]">
        <div>
            <p class="p-2 text-info font-[lobster] text-md md:text-lg tracking-[5px]">На сайте используются cookies.</p>
        </div>
        <div class="self-end mt-6 mr-4">
            <span role="button" class="px-4 py-2 border-2 border-dashed border-[#2196f3] font-[lobster] tracking-[5px] text-[#2196f3] hover:bg-yellow-200" on:click={acceptCookies}>ОК</span>
        </div>
    </div>
</div>
{/if}