import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import FloatingTools from "./FloatingTools";
import AmbientBackground from "./AmbientBackground";

export default function Layout() {
  const { pathname } = useLocation();
  const navigation = useNavigation();
  const lastPathRef = useRef<string>(pathname);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (navigation.state !== "idle") return;
    if (pathname === lastPathRef.current) return;
    lastPathRef.current = pathname;

    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const doScroll = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });
      if (!reducedMotion) {
        requestAnimationFrame(() => {
          if (window.scrollY !== 0) {
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });
          }
        });
      }
    };

    doScroll();
    const t = setTimeout(doScroll, 0);
    return () => clearTimeout(t);
  }, [pathname, navigation.state]);

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

