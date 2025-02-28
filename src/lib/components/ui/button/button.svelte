<script lang="ts" module>
  import type { WithElementRef } from 'bits-ui';
  import type {
    HTMLAnchorAttributes,
    HTMLButtonAttributes,
  } from 'svelte/elements';
  import { type VariantProps, tv } from 'tailwind-variants';

  export const buttonVariants = tv({
    base: 'relative overflow-hidden focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50',
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 shadow',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm',
        outline:
          'border-input bg-background hover:bg-accent hover:text-accent-foreground border shadow-sm',
        destructiveOutline:
          'border-destructive bg-destructive/20 hover:bg-destructive hover:text-destructive-foreground border shadow-sm',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  });
  export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
  export type ButtonSize = VariantProps<typeof buttonVariants>['size'];
  export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
    WithElementRef<HTMLAnchorAttributes> & {
      variant?: ButtonVariant;
      size?: ButtonSize;
    };
</script>

<script lang="ts">
  import { cn } from '$lib/utils';

  let {
    class: className,
    variant = 'default',
    size = 'default',
    ref = $bindable(null),
    href = undefined,
    type = 'button',
    children,
    ...restProps
  }: ButtonProps = $props();

  let ripples: { id: number; diameter: number; left: string; top: string }[] =
    $state([]);
  const createRipple = (e) => {
    if (!ref) return;
    if (ripples.length > 0) {
      const prev = ripples.length;
      setTimeout(() => {
        document.getElementById(`ripple-${prev}`)?.remove();
      }, 600);
    }
    const diameter = Math.max(ref.clientWidth, ref.clientHeight);
    const radius = diameter / 2;
    const left = `${e.offsetX - radius}px`;
    const top = `${e.offsetY - radius}px`;
    const id = ripples.length + 1;
    const newRipple = {
      id,
      diameter,
      left,
      top,
    };
    ripples = [...ripples, newRipple];
  };
</script>

{#if href}
  <a
    bind:this={ref}
    class={cn(buttonVariants({ variant, size, className }))}
    {href}
    {...restProps}
  >
    {@render children?.()}
  </a>
{:else}
  <button
    bind:this={ref}
    onclick={createRipple}
    class={cn(buttonVariants({ variant, size, className }))}
    {type}
    {...restProps}
  >
    {@render children?.()}
    {#each ripples as { diameter, left, top, id }}
      <span
        id={`ripple-${id}`}
        style="width: {diameter}px;height: {diameter}px;left: {left}; top: {top};animation-duration: 600ms"
      ></span>
    {/each}
  </button>
{/if}

<style>
  span {
    position: absolute;
    border-radius: 50%;
    transform: scale(0.7);
    animation-name: ripple;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
    background-color: rgba(255, 255, 255, 0.7);
    opacity: 0.5;
    filter: blur(2px);
    pointer-events: none;
  }
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
      filter: blur(5px);
    }
  }
</style>
