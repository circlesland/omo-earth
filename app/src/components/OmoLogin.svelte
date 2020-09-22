<script lang="ts">
  import IconsFontAwesome from "./IconsFontAwesome.svelte";
  import {RequestMagicLoginLink} from "../trigger/auth/requestMagicLoginLink";

  let emailAddress = "";
  let status = "new";
</script>

<IconsFontAwesome/>
<div class="bg-transparent flex">
  <div
          class="flex-col flex ml-auto mr-auto items-center w-full lg:w-2/3 md:w-3/5">
    <!-- <div class="font-bold uppercase text-2xl my-10 text-white">
      <img class="h-32" src="logo.png" alt="Omo Earth" />
    </div> -->
    {#if status === "new"}
      <form action="" class="mt-2 flex flex-col lg:w-1/2 w-8/12">
        <div
                class="flex flex-wrap items-stretch w-full relative h-18 bg-white
          items-center rounded-t pr-10">
          <div class="flex -mr-px justify-center w-15 p-4">
          <span
                  class="flex items-center leading-normal bg-white border-0 rounded
              rounded-r-none text-2xl text-gray-600">
            <i class="fas fa-user-circle"/>
          </span>
          </div>
          <input
                  type="email"
                  class="text-gray-600 flex-shrink flex-grow flex-auto leading-normal
            w-px flex-1 border-0 h-10 border-grey-light rounded rounded-l-none
            px-3 self-center relative font-roboto text-xl outline-none"
                  bind:value={emailAddress}
                  placeholder="Email"/>
        </div>
        <a on:click={() => window.trigger(new RequestMagicLoginLink(emailAddress))}
           class="rounded-b bg-secondary py-4 text-center px-17 md:px-12 md:py-4
          text-white leading-tight text-2xl font-bold md:text-base font-title
          uppercase">
          Send Login Mail
        </a>
      </form>
    {:else if status === "sending"}
      <form action="" class="mt-2 flex flex-col lg:w-1/2 w-8/12">
        <div
                class="flex flex-wrap items-stretch w-full relative h-18 bg-white
          items-center rounded-t pr-10">
          Sending a magic login link to your email address ...
        </div>
      </form>
    {:else if status === "waitingForUser"}
      <form action="" class="mt-2 flex flex-col lg:w-1/2 w-8/12">
        <div
                class="flex flex-wrap items-stretch w-full relative h-18 bg-white
          items-center rounded-t pr-10">
          Please click the link in the e-mail to log-on.
        </div>
      </form>
    {:else if status === "waitingForSession"}
      <form action="" class="mt-2 flex flex-col lg:w-1/2 w-8/12">
        <div
                class="flex flex-wrap items-stretch w-full relative h-18 bg-white
          items-center rounded-t pr-10">
          Exchanging the JWT for a session at the keyStore ..
        </div>
      </form>
    {:else if status === "done"}
      <form action="" class="mt-2 flex flex-col lg:w-1/2 w-8/12">
        <div
                class="flex flex-wrap items-stretch w-full relative h-18 bg-white
          items-center rounded-t pr-10">
          You're logged on.
        </div>
      </form>
    {/if}
  </div>
</div>
