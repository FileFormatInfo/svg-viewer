import { createContext, useContext } from "react";

import { createStore, useStore } from "zustand";

import { IImage } from "../types";

// get image from query params;
const getImageUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const imageParam = urlParams.get("url");
  return imageParam;
}

const hasImage = () => {
  return !!getImageUrl();
}

interface IStore {
  isError: boolean;
  state: "idle" | "loading" | "finished";
  url: string | null;
  load: (url: string) => Promise<void>;
}

export type ImageStore = ReturnType<typeof initializeImageStore>;

const zustandContext = createContext<ImageStore | null>(null);

export const Provider = zustandContext.Provider;

export const useImageStore = <T>(selector: (state: IStore) => T) => {
  const store = useContext(zustandContext);

  if (!store) throw new Error("ImageStore is missing the provider");

  return useStore(store, selector);
};

export const initializeImageStore = (preloadedState: Partial<IStore> = {}) => {
  return createStore<IStore>((set) => {
    if (hasImage()) {
      set({ state: "finished" });
    }

    return {
      isError: false,
      state: hasImage() ? "idle" : "finished",
      url: getImageUrl(),
      image: undefined as unknown as IImage,
      ...preloadedState,
      load: async (url: string) => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("url", url);
        const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
        window.history.replaceState({}, "", newUrl);
      },
    };
  });
};