import { SidebarComponent } from "./Sidebar";

function ContainerSidebar({ children }) {
  return (
    <div className="pl-72 max-w-7xl mx-auto">
      <SidebarComponent />
      <div className="p-4">{children}</div>
    </div>
  );
}

export default ContainerSidebar;
