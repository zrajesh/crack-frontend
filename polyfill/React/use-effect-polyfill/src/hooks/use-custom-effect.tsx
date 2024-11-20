import { DependencyList, EffectCallback, useRef } from "react";

const useCustomEffect = (effect: EffectCallback, deps?: DependencyList) => {
    const isFirstRender = useRef(true);
    const prevDeps = useRef<DependencyList | undefined>([]);

    // First render
    if(isFirstRender.current) {
        isFirstRender.current = false;
        const cleanup = effect();
        return () => {
            if (cleanup && typeof cleanup === "function") {
                cleanup();
            }
        };
    }

    // Deps changes and no Deps
    const depsChanges = deps ? JSON.stringify(deps) !== JSON.stringify(prevDeps.current) : true;

    if (depsChanges) {
        const cleanup = effect();
        // Cleanup
        if (cleanup && typeof cleanup === "function" && deps) {
            cleanup();
        }
    }

    prevDeps.current = deps || [];
};

export default useCustomEffect;