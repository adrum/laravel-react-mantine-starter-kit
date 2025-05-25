// modal.ts
import { router } from '@inertiajs/react';
import { lazy } from 'react';

type ModalData = {
  show: boolean;
  component?: string;
  props?: Record<string, any>;
  baseUrl?: string;
  resolvedComponent?: React.LazyExoticComponent<any>;
};

let modalState: ModalData = { show: false };
const listeners: ((state: ModalData) => void)[] = [];

// Get all page components at build time
const pages = import.meta.glob('./pages/**/*.tsx');

function notify() {
  listeners.forEach((cb) => cb(modalState));
}

export function useModalState() {
  return modalState;
}

export function useModalSubscribe(callback: (state: ModalData) => void) {
  listeners.push(callback);
  return () => {
    const i = listeners.indexOf(callback);
    if (i > -1) listeners.splice(i, 1);
  };
}

export function open(href: string, version: string) {
  fetch(href, {
    headers: {
      'X-Inertia': 'true',
      'X-Modal': 'true',
      'X-Inertia-Version': version,
    },
  })
    .then((res) => res.json())
    .then((data) => setModal(data))
    .catch((error) => {
      console.error('Failed to open modal:', error);
    });
}

export function setModal(data: any) {
  if (modalState.show) return;

  // Resolve the component path
  const componentPath = `./pages/${data.component}.tsx`;
  const pageLoader = pages[componentPath];

  if (!pageLoader) {
    console.error(`Component not found: ${componentPath}`);
    return;
  }

  // Create lazy component with proper error handling
  const component = lazy(async () => {
    try {
      const module = await pageLoader();

      if (!module?.default) {
        throw new Error(`Module ${componentPath} doesn't have a default export`);
      }

      return { default: module.default };
    } catch (error) {
      console.error(`Failed to load module ${componentPath}:`, error);
      throw error;
    }
  });

  modalState = {
    ...data,
    resolvedComponent: component,
    show: true,
  };
  notify();
}

export function close() {
  if (!modalState.show) return;
  modalState.show = false;
  notify();
}

export function reset() {
  if (modalState?.baseUrl && modalState.baseUrl !== window.location.href) {
    router.visit(modalState.baseUrl);
  }
  modalState = { show: false };
  notify();
}
