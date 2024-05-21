import { create } from "zustand";


interface AuthState {
    currentUser: string | null;
    setCurrentUser: (userData: string) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
}

export const useAuth = create<AuthState>((set) => ({
    currentUser: null,
    setCurrentUser: (currentUser : string | null) => set({ currentUser }),
    isLoading: true,
    setIsLoading: (loading : boolean) => set({ isLoading: loading }),
}));
