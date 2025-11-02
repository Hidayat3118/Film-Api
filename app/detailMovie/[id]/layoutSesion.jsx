import Navbar from "../../component/navbar";

const Layout = ({ children }) => {
  return (
    <main className="">
      <Navbar></Navbar>
      <div className="container mx-auto ">
          {children}
      </div>
    </main>
  );
};


export default Layout;