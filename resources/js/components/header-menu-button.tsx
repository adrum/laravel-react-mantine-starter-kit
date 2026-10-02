import type { InertiaLinkProps } from '@inertiajs/react';
import type { ButtonProps } from '@mantine/core';
import { Button, Tooltip } from '@mantine/core';
import React from 'react';
import { cn } from '@/lib/utils';

type Props = {
  component?: React.ElementType;
  icon?: React.ReactNode | null;
  iconOnly?: boolean;
  tooltip?: string;
  isActive?: boolean;
} & Omit<ButtonProps, 'component'> &
  Partial<Omit<InertiaLinkProps, 'component' | keyof ButtonProps>>;

export default function HeaderMenuButton({
  className,
  tooltip,
  isActive,
  icon,
  styles,
  iconOnly,
  children,
  ...props
}: Props) {
  const buttonContent = (
    // @ts-expect-error - Mantine types are incorrect
    <Button
      size="sm"
      color="gray"
      variant="subtle"
      leftSection={icon}
      justify={iconOnly ? 'center' : 'start'}
      className={cn(
        'w-full text-foreground transition-none',
        className,
        iconOnly && 'p-2!',
      )}
      styles={(theme, buttonProps, ctx) => {
        const base = ((typeof styles === 'function'
          ? styles(theme, buttonProps, ctx)
          : styles) ?? {}) as Record<string, React.CSSProperties>;

        return {
          ...base,
          root: {
            color: 'var(--foreground)',
            ...(isActive && { backgroundColor: 'var(--muted)' }),
            ...base.root,
          },
          ...(iconOnly && {
            section: { marginRight: 0, ...base.section },
          }),
        };
      }}
      {...props}
    >
      {!iconOnly && children}
    </Button>
  );

  return (
    <div
      className={cn(
        'flex h-full flex-col items-center justify-center',
        isActive && 'border-b border-b-foreground',
      )}
    >
      {tooltip ? (
        <Tooltip
          withArrow
          arrowSize={6}
          offset={10}
          label={<span className="text-xs">{tooltip}</span>}
        >
          {buttonContent}
        </Tooltip>
      ) : (
        buttonContent
      )}
    </div>
  );
}
