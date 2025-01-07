// export const disableDevTools = () => {
//   if (typeof window === "undefined") return;

//   document.addEventListener("contextmenu", (e) => e.preventDefault());

//   document.addEventListener("keydown", (e) => {
//     if (
//       e.key === "F12" ||
//       (e.ctrlKey && e.shiftKey && e.key === "I") ||
//       (e.ctrlKey && e.shiftKey && e.key === "J") ||
//       (e.ctrlKey && e.shiftKey && e.key === "C") ||
//       (e.ctrlKey && e.key === "u")
//     ) {
//       e.preventDefault();
//       return false;
//     }
//   });

//   // Disable console output
//   if (process.env.NODE_ENV === "production") {
//     console.clear();
//     console.log = console.warn = console.error = function () {};
//   }

//   // DevTools detection
//   function detectDevTools() {
//     const widthThreshold = window.outerWidth - window.innerWidth > 160;
//     const heightThreshold = window.outerHeight - window.innerHeight > 160;

//     if (widthThreshold || heightThreshold) {
//       document.body.innerHTML = "Developer tools are not allowed on this site.";
//     }
//   }

//   window.addEventListener("resize", detectDevTools);
//   setInterval(detectDevTools, 1000);
// };
