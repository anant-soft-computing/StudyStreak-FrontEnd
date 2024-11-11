import React, { useEffect } from 'react';

const withBootstrap = (WrappedComponent) => {
    return (props) => {
        useEffect(() => {
            const bootstrapCSS = document.createElement('link');
            bootstrapCSS.rel = 'stylesheet';
            bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css';
            document.head.appendChild(bootstrapCSS);

            const bootstrapJS = document.createElement('script');
            bootstrapJS.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js';
            bootstrapJS.async = true;
            document.body.appendChild(bootstrapJS);

            const stylesheets = [
                '../src/css/index.css',
                '../src/css/animate.min.css',
                '../src/css/aos.min.css',   
                '../src/css/magnific-popup.css',
                '../src/css/icofont.min.css',
                '../src/css/slick.css',
                '../src/css/swiper-bundle.min.css',
                '../src/css/bootstrap.min.css',
                '../src/css/style.css'
            ];

            stylesheets.forEach(href => {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                document.head.appendChild(link);
            });

            return () => {
                document.head.removeChild(bootstrapCSS);
                document.body.removeChild(bootstrapJS);
                document.querySelectorAll('link[rel=stylesheet]').forEach((link) => {
                    if (stylesheets.includes(link.href)) {
                        document.head.removeChild(link);
                    }
                });
            };
        }, []);

        return <WrappedComponent {...props} />;
    };
};

export default withBootstrap;