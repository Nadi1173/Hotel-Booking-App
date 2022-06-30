import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <Featured/> {/*  to show featured hotels in different cities */}
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>   {/*  to show hotels by propery type */}
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties/>   {/*  to show featured properties */}
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
