import ctaImage from './images/cta.png';  // importing the image
import mitImage from './images/mit.png';  // importing the image
import neuImage from './images/neu.png';  // importing the image

const Home = () => {

  return (
    <div className="home">
      <h2>RailOps App</h2>
        <h4 className="homepageText">
            Welcome to the RailOps App! Click on stations above to get monitoring information and recommendations.
            Developers: Zhihao Lyu, Joseph Rodriguez, Mojtaba Yousefi, Haris Koutsopoulos
        </h4>
        <img src={ctaImage} alt="CTA Logo" />  {/* inserting the image */}
        <img src={mitImage} alt="MIT Logo" />  {/* inserting the image */}
        <img src={neuImage} alt="NEU Logo" />  {/* inserting the image */}
        <h4>
        </h4>
    </div>
  );
};

export default Home;