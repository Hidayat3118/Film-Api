import Navbar from "../component/navbar";
import Footer from "../component/footer";

const Layout = ({ children }) => {
  return (
    <main className="bg-gray-100">
      <Navbar></Navbar>
      <div className="container mx-auto pt-32 min-h-screen">
          {children}
      </div>
      <Footer></Footer>
    </main>
  );
};


export default Layout;