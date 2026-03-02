import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function DashboardLayout({ links, children }) {
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar links={links} />
        <div style={{ flex: 1, padding: 20 }}>{children}</div>
      </div>
    </>
  );
}

export default DashboardLayout;