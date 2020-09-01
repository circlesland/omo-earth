<script lang="ts">
  import { transactions } from "../stores/transactions";
  import { users } from "../stores/users";
  import moment from "moment";
</script>

<section class="bg-white w-full p-8">
  <div class="font-title text-tertiary text-xl">Transaction History</div>
  {#each $transactions as t}
    <div
      class="flex h-14 w-full text-secondary border-b border-gray-100
      hover:bg-gray-100">
      <div
        class="w-12 h-12 pt-2 flex flex-col justify-center text-center"
        class:text-green-400={t.direction === 'in'}>
        {#if t.type}
          <i
            class="text-2xl fas"
            class:fa-coffee={t.type === 'beverages'}
            class:fa-car={t.type === 'mobility'}
            class:fa-home={t.type === 'rent'}
            class:fa-money-bill={t.type === 'paycheck'}
            class:fa-leaf={t.type === 'ubi'} />
        {:else if t.direction == 'in'}
          <i class="text-2xl fas fa-arrow-up" />
        {:else if t.direction == 'out'}
          <i class="text-2xl fas fa-arrow-down" />
        {/if}
      </div>
      <div class="text-base py-2 px-2 flex-1">
        <b class="text-secondary font-title">{t.subject}</b>
        <p class="text-xs -mt-1 text-gray-500">
          {moment.unix(t.createdAt).locale('en').fromNow()}
          {#if t.direction === 'in'}
            from {users.byId(t.from.id).name}
          {:else}to {users.byId(t.to.id).name}{/if}
        </p>
      </div>
      <div
        class="font-title h-12 py-2 px-3 text-3xl font-bold"
        class:text-green-400={t.direction === 'in'}
        class:text-secondary={t.direction === 'out'}>
        {#if t.direction === 'out'}-{t.amount}{:else}{t.amount}{/if}
      </div>
    </div>
  {/each}
</section>
