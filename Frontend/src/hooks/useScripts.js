import { useEffect } from 'react';

const useScript = (url,integrity,crossOrigin,referrerpolicy,async) => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = url;
        script.integrity=integrity;
        script.crossOrigin=crossOrigin;
        script.referrerpolicy=referrerpolicy;
        script.async = async;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [url,integrity,crossOrigin,referrerpolicy,async]);
};

export default useScript;