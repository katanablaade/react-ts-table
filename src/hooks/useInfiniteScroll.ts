import { useEffect } from "react";

type UseInfiniteScrollProps = {
  ref: React.RefObject<HTMLElement | null>;
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
};

export const useInfiniteScroll = ({
  ref,
  hasMore,
  isLoading,
  onLoadMore,
}: UseInfiniteScrollProps) => {
  useEffect(() => {
    if (isLoading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          onLoadMore();
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [onLoadMore, hasMore, isLoading]);
};
