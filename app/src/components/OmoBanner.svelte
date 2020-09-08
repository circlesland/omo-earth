<script lang="ts">
  export let data = {
    title: "omo earth",
    image: "https://source.unsplash.com/random",
    link: "/",
  };
</script>

<div
  class="bg-cover bg-center object-fill"
  style="background-image: url({data.image})">
  <div class="h-full flex flex-col justify-center">
    <div class="flex flex-wrap w-5/6 md:w-2/4 m-auto">
      <div
        class="w-full text-center px-16 py-8 rounded-t"
        style="background-color: rgba(11, 42, 77, 0.4);">
        <h1
          class="uppercase text-gray-200 font-title text-4xl md:text-5xl
            lg:text-6xl">
          {data.title}
        </h1>
      </div>
      <a
        href={data.link}
        class="text-center w-full text-white bg-action py-2 px-4 uppercase
          text-lg font-bold rounded-b hover:bg-primary">
        Login
      </a>
    </div>
  </div>
</div>
