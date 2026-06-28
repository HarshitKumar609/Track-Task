import { ClipboardList } from "lucide-react";

const Navbar = () => {
  return (
    <nav
      className="
      min-h-8
      fixed
      top-4
      left-1/2
      -translate-x-1/2
      w-[95%]
      max-w-7xl
      z-50
      rounded-2xl
      border
      border-white/40
      bg-white/30
      backdrop-blur-xl
      shadow-xl
      "
    >
      <div className="flex h-20 items-center justify-between px-8">
        {/* Logo */}

        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-3 rounded-xl text-white">
            <ClipboardList size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">Task Tracker</h1>

            <p className="text-sm text-slate-500">Manage your daily work</p>
          </div>
        </div>

        {/* Right */}

        {/* <div className="hidden md:flex items-center gap-6">
          <span className="text-slate-600 font-medium">MERN Stack</span>

          <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
            T
          </div>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
