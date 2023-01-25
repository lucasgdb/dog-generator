import { useEffect, useMemo, useRef, useState } from 'react';
import { clsx } from 'clsx';
import mediumZoom from 'medium-zoom';
import { Spinner } from './Spinner';

declare global {
  interface Window {
    WebKitMutationObserver?: {
      new (callback: MutationCallback): MutationObserver;
      prototype: MutationObserver;
    };
    MozMutationObserver?: {
      new (callback: MutationCallback): MutationObserver;
      prototype: MutationObserver;
    };
  }
}

export function ImageWithLoader(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [hidden, setHidden] = useState(true);

  const imgRef = useRef<HTMLImageElement>(null);

  const uuid = useMemo(() => self.crypto.randomUUID(), []);

  useEffect(() => {
    if (!hidden) {
      mediumZoom(`[data-zoomable="${uuid}"]`, {
        background: '#000',
        margin: 24,
      });
    }
  }, [hidden]);

  useEffect(() => {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    const handleChangeAvatar = () => setHidden(true);

    const observer = new MutationObserver(handleChangeAvatar);

    observer.observe(imgRef.current as HTMLImageElement, {
      attributes: true,
      attributeFilter: ['src'],
    });

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setHidden(false);
  };

  return (
    <>
      {hidden && (
        <div className={clsx('flex justify-center items-center', props.className)}>
          <Spinner />
        </div>
      )}

      <img
        onLoad={handleLoad}
        hidden={hidden}
        ref={imgRef}
        width={264}
        height={419}
        alt="card"
        data-zoomable={uuid}
        {...props}
      />
    </>
  );
}
