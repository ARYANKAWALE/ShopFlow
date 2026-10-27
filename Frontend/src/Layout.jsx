import { useRef } from "react";
import { Outlet } from "react-router-dom";
import Navigation from "./components/ui/Navigation";
import { ScrollContainerContext } from "./context/ScrollContainerContext";
// import Sidebar from "./components/ui/Sidebar";

export default function Layout() {
  const scrollRef = useRef(null);

  return (
    <ScrollContainerContext.Provider value={scrollRef}>
      <div className="flex flex-col h-screen w-full overflow-hidden bg-bg text-ink">
        <Navigation />
        <div className="flex flex-1 min-h-0">
          {/* <Sidebar /> */}
          <main ref={scrollRef} className="flex-1 overflow-y-auto bg-bg pt-20 text-ink">
            <Outlet />
          </main>
        </div>
      </div>
    </ScrollContainerContext.Provider>
  );
}
