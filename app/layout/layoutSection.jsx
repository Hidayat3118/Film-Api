import Navbar from "../component/navbar";
import Footer from "../component/footer";

const LayoutSection = ({ children }) => {
  return (
    <main className="bg-gray-100">
      <Navbar></Navbar>
      <div className="container mx-auto mt-32">
        <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5 xl:gap-10 px-3">
          {children}
        </section>
      </div>
      <Footer></Footer>
    </main>
  );
};


export default LayoutSection;