import { useState, useEffect } from 'react';

type Permission = string;
type Resource = unknown | null;

interface PermissionCheck {
  permission: Permission;
  resource?: Resource;
  result: boolean;
}

let csrfToken: string | null = null;

const permissionCache: Record<string, boolean> = {};
const loadingStates: Record<string, boolean> = {};
const subscribers = new Set<() => void>();

const notify = () => {
  subscribers.forEach(fn => fn());
};

const checkPermission = async (permission: Permission, resource: Resource = null): Promise<boolean> => {
  const cacheKey = `${permission}-${JSON.stringify(resource)}`;

  if (permissionCache[cacheKey] !== undefined) {
    return permissionCache[cacheKey];
  }

  loadingStates[cacheKey] = true;
  notify();

  try {
    const response = await fetch('/check-permission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-TOKEN': csrfToken!,
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({ permission, resource }),
      credentials: 'same-origin'
    });

    if (!response.ok) {
      throw new Error(`Permission check failed: ${response.status}`);
    }

    const data = await response.json();
    permissionCache[cacheKey] = data.can;
    return data.can;
  } catch (error) {
    console.error('Permission check error:', error);
    permissionCache[cacheKey] = false;
    return false;
  } finally {
    loadingStates[cacheKey] = false;
    notify();
  }
};

const canAccess = (permission: Permission, resource: Resource = null): boolean => {
  const cacheKey = `${permission}-${JSON.stringify(resource)}`;
  return permissionCache[cacheKey] || false;
};

const isLoading = (permission: Permission, resource: Resource = null): boolean => {
  const cacheKey = `${permission}-${JSON.stringify(resource)}`;
  return !!loadingStates[cacheKey];
};

const preload = async (permissions: Array<{ permission: Permission; resource?: Resource }>) => {
  await Promise.all(
    permissions.map(({ permission, resource }) =>
      checkPermission(permission, resource)
    )
  );
};

export const usePermission = (csrf: string) => {
  const [, setVersion] = useState(0);

  useEffect(() => {
    csrfToken = csrf;

    const forceUpdate = () => setVersion(v => v + 1);
    subscribers.add(forceUpdate);
    return () => {
      subscribers.delete(forceUpdate);
    };
  }, [csrf]);

  return {
    can: canAccess,
    check: checkPermission,
    isLoading,
    preload,
  };
};

