import { SidebarComponent } from "./Sidebar";

function ContainerSidebar({ children }) {
  return (
    <div className="pl-72 py-4">
      <SidebarComponent />
      {children}
    </div>
  )
}

export default ContainerSidebar;