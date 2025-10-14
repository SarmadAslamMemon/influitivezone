import Link from "next/link";
import Image from "next/image";
import { portfolioData } from "../../data/portfolioData";

const DigitalAgencyPortfolio = () => {
  return (
    <section className="portfolio-gallery">
      {/* Header Section */}
      <div className="portfolio-header">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="portfolio-header-content">
                <h2 className="portfolio-title">
                  We have done a lot of work and would like you to take a look!
                </h2>
                <p className="portfolio-subtitle">
                  Here&apos;s a portfolio of hard work, skill, and passion. Our creative team are experts in designing and developing solutions to enhance your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Portfolio Gallery */}
      <div className="portfolio-gallery-grid">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="gallery-container">
                {portfolioData.projects.slice(0, 9).map((project, index) => {
                  // Create varying heights for Pinterest-like effect
                  const heights = [250, 300, 350, 280, 320, 270, 290, 310];
                  const randomHeight = heights[index % heights.length];
                  
                  return (
                    <div key={project.id} className="gallery-item">
                      <div className="project-image" style={{ height: `${randomHeight}px` }}>
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={400}
                          height={randomHeight}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '8px'
                          }}
                        />
                        <div className="project-overlay">
                          <Link href="/portfolio" className="view-details-button">
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View All Button */}
      <div className="portfolio-cta">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="cta-wrapper">
                <Link href="/portfolio" className="view-all-btn">
                  <span>View All Projects</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DigitalAgencyPortfolio;
