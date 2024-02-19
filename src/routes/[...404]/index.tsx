import { component$ } from '@builder.io/qwik';
import { type DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <section class="flex mx-auto max-w-7xl px-6 sm:items-center justify-center min-h-[calc(100lvh-68px)]" >
      <div class="font-bold text-red-400 text-4xl mb-12">
        <h1 class="mt-12">404: Page not found</h1>
        <p class="font-italic text-gray-400 text-xl">
          Whoops! You've hit a dead-end. <a href="/" class="text-blue-300/50 underline">Go back home</a>
        </p>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: '404: Page not found',
  meta: [
    {
      name: 'description',
      content: 'Whoops! You\'ve hit a dead-end.',
    },
    {
      name: 'og:description',
      content: 'Whoops! You\'ve hit a dead-end.',
    },
  ],
};