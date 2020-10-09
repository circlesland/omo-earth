<script>
  $: {
  }
</script>

<div class="bg-white relative shadow text-gray-800 overflow-hidden">
  <div class="z-0 relative group h-64 w-full flex justify-center items-center">
    <div
      class="h-full w-full absolute bg-cover z-10 bg-center"
      style="background-image: url('https://source.unsplash.com/featured/?munich,city')" />
    <p
      class="font-title w-full h-full bg-primary opacity-50 text-center pt-20
        font-bold text-5xl text-white absolute z-20 pointer-events-none
        uppercase">
    </p>
  </div>
  <div class="flex justify-center z-30">
    <img
      src="https://i.pravatar.cc/150?u=muddaoida"
      class="z-30 rounded-full -mt-20 border-8 object-center object-cover
        border-white mr-2 h-36 w-36"
      alt="" />
  </div>
  <div class="p-4 h-40">
    <!-- 
    <div class="font-bold font-title text-xl text-center">
     {#await lookupName(data.creatorId)}
        Loading Omosapien ..
      {:then name}
        {name}
      {/await}    
    </div>-->
    <p class="text-center text-gray-600 uppercase">Hello world!</p>
    <div class="text-sm font-light text-center py-1 px-4">My Pledge</div>
  </div>
  <!-- 
  <div class="h-10 flex items-center justify-between bg-gray-100">
    <a
      href="javascript:navigate('omodream', '{profileData.id}')"
      class="w-full text-center text-white bg-tertiary font-bold text-lg px-4
        py-2 uppercase hover:bg-secondary">
      join dream
    </a>
  </div> -->
</div>
