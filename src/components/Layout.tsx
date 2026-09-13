import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import FloatingTools from "./FloatingTools";
import AmbientBackground from "./AmbientBackground";

export default function Layout() {
  const { pathname } = useLocation();
  const lastPathRef = useRef<string>(pathname);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (pathname === lastPathRef.current) return;
    lastPathRef.current = pathname;

    const docEl = document.documentElement;
    const prevBehavior = docEl.style.scrollBehavior;
    docEl.style.scrollBehavior = "auto";

    const doScroll = () => {
      window.scrollTo(0, 0);
    };

    doScroll();
    const t = setTimeout(doScroll, 0);
    const t2 = setTimeout(doScroll, 50);
    const t3 = setTimeout(() => {
      docEl.style.scrollBehavior = prevBehavior;
    }, 60);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
      clearTimeout(t3);
      docEl.style.scrollBehavior = prevBehavior;
    };
  }, [pathname]);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <AmbientBackground />
      <div className="site-shell">
        <Nav />
        <main id="main">
          <Outlet />
        </main>
        <Footer />
      </div>
      <FloatingTools />
    </>
  );
}

