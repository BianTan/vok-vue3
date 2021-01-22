<template>
  <transition
      enter-active-class="transition transform ease-out duration-200 opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition transform ease-in duration-200"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
    <slot/>
  </transition>
</template>
