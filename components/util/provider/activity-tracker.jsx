import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

const ActivityTracker = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let inactivityTimer;

    // Function to reset inactivity timer
    const resetTimer = () => {
      if (isActive) {
        setIsActive(true);
      }
      clearTimeout(inactivityTimer);

      inactivityTimer = setTimeout(() => {
        setIsActive(false);
        signOut();
      }, 10 * 60 * 1000);
    };

    // Attach event listeners for activity
    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    // Cleanup: Remove event listeners and clear timeout on unmount
    return () => {
      clearTimeout(inactivityTimer);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [isActive]);

  return null;
};

export default ActivityTracker;
