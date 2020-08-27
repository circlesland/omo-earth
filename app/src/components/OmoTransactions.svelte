<section>
  <div class="bg-white w-full p-8">
    <div class="font-title text-tertiary text-xl">Transaction History</div>
    <div class="flex h-14 w-full text-secondary border-b border-gray-100">
      <div class="w-12 h-12 flex flex-col justify-center text-center">
        <i class="text-2xl fas fa-arrow-down" />
      </div>
      <div class="text-base py-2 px-2 flex-1">
        <b class="text-secondary font-title">Transaction description</b>
        <p class="text-xs -mt-2 text-gray-500">
          10min ago from Omo Sapien
          <!-- {moment.unix(item.time).locale('en').fromNow()} -->
        </p>
      </div>
      <div class="font-title h-12 py-2 px-3 text-2xl font-bold text-secondary">
        -15
        <!-- {(item.transfer.amount / 1000000000000000000).toFixed(2)} Φ -->
      </div>
    </div>
    <div class="flex h-14 w-full text-secondary border-b border-gray-100">
      <div class="w-12 h-12 flex flex-col justify-center text-center">
        <i class="text-2xl fas fa-arrow-up" />
      </div>
      <div class="text-base py-2 px-2 flex-1">
        <b class="text-secondary font-title">Transaction description</b>
        <p class="text-xs -mt-2 text-gray-500">
          1h ago to Omo Sapien 2
          <!-- {moment.unix(item.time).locale('en').fromNow()} -->
        </p>
      </div>
      <div class="font-title h-12 py-2 px-3 text-2xl font-bold text-green-400">
        122
        <!-- {(item.transfer.amount / 1000000000000000000).toFixed(2)} Φ -->
      </div>
    </div>
    <div class="flex h-14 w-full text-secondary border-b border-gray-100">
      <div class="w-12 h-12 flex flex-col justify-center text-center">
        <i class="text-2xl fas fa-leaf" />
      </div>
      <div class="text-base py-2 px-2 flex-1">
        <b class="text-secondary font-title">Received Universal Basic income</b>
        <p class="text-xs -mt-2 text-gray-500">
          1day ago from planet earth
          <!-- {moment.unix(item.time).locale('en').fromNow()} -->
        </p>
      </div>
      <div class="font-title h-12 py-2 px-3 text-2xl font-bold text-green-400">
        24
        <!-- {(item.transfer.amount / 1000000000000000000).toFixed(2)} Φ -->
      </div>
    </div>
  </div>
</section>
