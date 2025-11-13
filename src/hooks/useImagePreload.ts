import { useState, useEffect } from 'react';

/**
 * Custom hook to preload images and track loading state
 * @param src - Image source URL
 * @returns Object containing loading state and error state
 */
export const useImagePreload = (src: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setLoading(false);
      setError(false);
    };

    img.onerror = () => {
      setLoading(false);
      setError(true);
    };

    img.src = src;

    // Cleanup
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { loading, error };
};

/**
 * Custom hook to preload multiple images and track overall loading state
 * @param sources - Array of image source URLs
 * @returns Object containing loading state, progress, and error state
 */
export const useMultipleImagePreload = (sources: string[]) => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sources.length === 0) {
      setLoading(false);
      return;
    }

    let mounted = true;
    let loaded = 0;
    let errors = 0;

    const loadImage = (src: string) => {
      return new Promise<void>((resolve) => {
        const img = new Image();

        img.onload = () => {
          if (mounted) {
            loaded++;
            setLoadedCount(loaded);
          }
          resolve();
        };

        img.onerror = () => {
          if (mounted) {
            errors++;
            setErrorCount(errors);
          }
          resolve();
        };

        img.src = src;
      });
    };

    Promise.all(sources.map(loadImage)).then(() => {
      if (mounted) {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [sources]);

  const progress = sources.length > 0 ? (loadedCount / sources.length) * 100 : 0;

  return {
    loading,
    loadedCount,
    errorCount,
    total: sources.length,
    progress
  };
};
