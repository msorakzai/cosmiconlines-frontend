import { useEffect } from "react";

export default function useScrollReveal() {
  useEffect(() => {
    const reveal = () => {
      const sections = document.querySelectorAll(".section-reveal");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        { threshold: 0.1 }
      );

      sections.forEach((section) => observer.observe(section));
    };

    // Delay to ensure DOM is ready
    const timeout = setTimeout(reveal, 100);
    return () => clearTimeout(timeout);
  }, []);
}
