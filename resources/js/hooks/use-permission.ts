// utils/usePermission.ts
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

type Permission = string;
type Resource = unknown | null;

const cache: Record<string, boolean> = {};
const loading: Record<string, boolean> = {};

export const usePermission = () => {
  const [, forceRender] = useState(0);
  const csrf_token = String(usePage().props.csrf_token);

  const getKey = (permission: Permission, resource: Resource = null) =>
    `${permission}-${JSON.stringify(resource)}`;

  const can = (permission: Permission, resource: Resource = null): boolean => {
    const key = getKey(permission, resource);

    if (key in cache) return cache[key];

    if (loading[key]) return false;

    loading[key] = true;
    fetch('/check-permission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-TOKEN': csrf_token,
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({ permission, resource }),
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(data => {
        cache[key] = data.can ?? false;
      })
      .catch(() => {
        cache[key] = false;
      })
      .finally(() => {
        delete loading[key];
        forceRender(v => v + 1);
      });

    return false;
  };

  return { can };
};

