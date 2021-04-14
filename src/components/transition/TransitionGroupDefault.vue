<template>
  <transition-group
    enter-active-class="transition ease-out duration-200 opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
    tag="ul"
  >
    <slot />
  </transition-group>
</template>
