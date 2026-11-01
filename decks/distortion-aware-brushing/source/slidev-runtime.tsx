import { Children, cloneElement, createContext, isValidElement, useContext } from 'react';
import type { ComponentType, ReactNode } from 'react';
export type Page = ComponentType;
export type SlideTransition = Record<string, unknown>;
export const SlideContext = createContext({ active: false, current: 1, total: 22, clicks: 0 });
export const useIsActivePage = () => useContext(SlideContext).active;
export const useSlidePageNumber = () => { const { current, total } = useContext(SlideContext); return { current, total }; };
export const Steps = ({ children }: { children: ReactNode }) => {
  const { clicks } = useContext(SlideContext);
  let index = 0;
  return <>{Children.toArray(children).map(child => isValidElement(child) && child.type === Step ? cloneElement(child as any, { revealed: ++index <= clicks }) : child)}</>;
};
export const Step = ({ children, revealed = true, duration = 180 }: { children: ReactNode; revealed?: boolean; duration?: number }) => <div data-osd-step={revealed ? 'revealed' : 'pending'} style={{ opacity: revealed ? 1 : 0, visibility: revealed ? 'visible' : 'hidden', transition: `opacity ${duration}ms ease-out` }}>{children}</div>;
