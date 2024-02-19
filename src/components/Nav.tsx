// LuminescentDev Navbar Component Dec 11

import { component$, Slot, useStore } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';

import { ChevronDown, LogoDiscord, LogoGithub, Menu } from 'qwik-ionicons';
import LoadingIcon from './icons/LoadingIcon';

import { useAuthSession } from '~/routes/plugin@auth';

export default component$(() => {
  const store = useStore({ mobilemenu: false });
  const session = useAuthSession();

  return (
    <Nav>
      <MainNav>
        {session.value?.user &&
          <>
            <NavButton type="external" href="/api/auth/signout">
              Logout
            </NavButton>
          </>
        }
        {
          !session.value?.user &&
          <NavButton type="external" href="/api/auth/signin">
            Login
          </NavButton>
        }
        <SocialButtons />
        <NavButton type="div" icon title="Menu" onClick$={() => { store.mobilemenu = !store.mobilemenu; }} extraClass={{ 'flex sm:hidden fill-current hover:fill-white': true }}>
          <Menu width="24" />
        </NavButton>
      </MainNav>
      <MobileNav store={store}>
        <NavButton type="external" href="https://panel.birdflop.com/">
          Panel
        </NavButton>
        <NavButton type="external" href="https://client.birdflop.com/">
          Billing
        </NavButton>
        <NavButton type="external" href="https://www.birdflop.com/node-stats/">
          Node Stats
        </NavButton>
        <NavButton href="/resources">
          More Resources
        </NavButton>
        <div class="flex justify-evenly">
          <SocialButtons />
        </div>
      </MobileNav>
    </Nav>
  );
});

export const Nav = component$(() => {
  return (
    <nav class="z-20 fixed top-0 w-screen backdrop-blur-xl">
      <div class="transition-all">
        <Slot />
      </div>
    </nav>
  );
});

export const Brand = component$(() => {
  const location = useLocation();
  return (
    <div class="flex items-center justify-start">
      <Link href="/" class="transition ease-in-out text-gray-300 hover:bg-blue-700/20 hover:text-white drop-shadow-2xl px-3 pb-3 pt-3 rounded-lg text-lg flex tracking-wider items-center">
        <span class="ml-3">MultiShock</span>
        <div class={{
          'transition-all': true,
          '-ml-7 opacity-0': !location.isNavigating,
        }}>
          <LoadingIcon />
        </div>
      </Link>
    </div>
  );
});

export const MainNav = component$(() => {
  return (
    <div class={'bg-blue-700/20 py-2'}>
      <div class={'mx-auto relative flex items-center justify-between max-w-7xl px-2'}>
        <Brand />
        <div class="flex flex-1 items-center justify-end">
          <div class="flex gap-1 text-gray-300 whitespace-nowrap">
            <Slot />
          </div>
        </div>
      </div>
    </div>
  );
});

export const MobileNav = component$(({ store }: any) => {
  return (
    <div id="mobile-menu" class={{
      'gap-2 px-3 flex flex-col sm:hidden transition-all duration-300 bg-blue-700/20 ': true,
      'opacity-100 max-h-screen pt-2 pb-8': store.mobilemenu,
      'opacity-0 max-h-0 py-0 pointer-events-none': !store.mobilemenu,
    }}>
      <Slot />
    </div>
  );
});

export const NavButton = component$(({ href, title, icon, type, extraClass, style, store, onClick$ }: any) => {
  const _class = {
    'group transition ease-in-out hover:bg-blue-700/20 hover:text-white py-3 rounded-lg items-center cursor-pointer': true,
    'text-3xl px-3': icon,
    'px-4 flex gap-3': !icon,
    ...extraClass,
  };

  return <>
    {type == 'external' &&
      <a href={href} title={title} style={style} class={_class}>
        <Slot />
      </a>
    }
    {type == 'div' &&
      <div title={title} style={style} class={_class} onClick$={onClick$}>
        <Slot />
      </div>
    }
    {!type &&
      <Link href={href} title={title} style={style} class={_class} onClick$={() => { store ? store.mobilemenu = false : undefined; }}>
        <Slot />
      </Link>
    }
  </>;
});

export const Dropdown = component$(({ name, Icon, extraClass }: any) => {
  return (
    <div class={{
      'cursor-pointer transition ease-in-out gap-3 hover:bg-blue-700/20 hover:text-white drop-shadow-2xl group rounded-lg items-center': true,
      ...extraClass,
    }}>
      <div class="px-4 py-2 flex gap-2.5 items-center">
        {Icon && <Icon width="24" />}
        {name}
        <ChevronDown width="16" class="transform group-hover:-rotate-180 transition ease-in-out" />
      </div>
      <div class="absolute top-8 left-0 z-10 hidden group-hover:flex pt-5 text-base">
        <div class="bg-gray-900 border border-gray-800 rounded-xl px-3 py-4 flex flex-col gap-2 font-medium whitespace-nowrap overflow-y-auto max-h-[calc(100svh-128px)]">
          <Slot />
        </div>
      </div>
    </div>
  );
});

export const SocialButtons = component$(() => {
  return <>
    <NavButton type="external" icon href="https://github.com/bwmp/MultiShock" title="GitHub" extraClass={{ 'flex fill-current hover:fill-white': true }}>
      <LogoGithub width="24" />
    </NavButton>
    <NavButton type="external" icon href="https://discord.gg/EQmGcKCNyp" title="Discord" extraClass={{ 'flex fill-current hover:fill-white': true }}>
      <LogoDiscord width="24" />
    </NavButton>
  </>;
});