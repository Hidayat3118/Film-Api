import Navbar from "../component/navbar";
import Footer from "../component/footer";

const LayoutSection = ({ children }) => {
  return (
    <main className="bg-gray-100">
      <Navbar></Navbar>
      <div className="container mx-auto pt-28 min-h-screen">
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-4 xl:gap-6 px-3 md:px-0 md:mt-4">
          {children}
        </section>
      </div>
      <Footer></Footer>
    </main>
  );
};


export default LayoutSection;