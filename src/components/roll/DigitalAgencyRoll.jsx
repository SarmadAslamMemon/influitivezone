import { FreeMode, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

const DigitalAgencyRoll = () => {
  return (
    <>
      <section className="roll__area">
        <div className="roll__slider">
          <Swiper
            modules={[FreeMode, Autoplay]}
            spaceBetween={100}
            slidesPerView={1}
            freeMode={false}
            loop={true}
            centeredSlides={true}
            allowTouchMove={false}
            speed={2000}
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              800: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
              1300: {
                slidesPerView: 5,
              },
              1900: {
                slidesPerView: 8,
              },
            }}
          >
            <SwiperSlide>
              <div className="roll__slide" style={{ padding: '0 20px' }}>
                <h2 style={{ fontSize: '20px', whiteSpace: 'nowrap' }}>Website Development</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="roll__slide" style={{ padding: '0 20px' }}>
                <h2 style={{ fontSize: '20px', whiteSpace: 'nowrap' }}>Mobile Design</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="roll__slide" style={{ padding: '0 20px' }}>
                <h2 style={{ fontSize: '20px', whiteSpace: 'nowrap' }}>Digital Marketing</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="roll__slide" style={{ padding: '0 20px' }}>
                <h2 style={{ fontSize: '20px', whiteSpace: 'nowrap' }}>Branding and Logo Design</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="roll__slide" style={{ padding: '0 20px' }}>
                <h2 style={{ fontSize: '20px', whiteSpace: 'nowrap' }}>Social Media Management</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="roll__slide" style={{ padding: '0 20px' }}>
                <h2 style={{ fontSize: '20px', whiteSpace: 'nowrap' }}>Content Creation</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="roll__slide" style={{ padding: '0 20px' }}>
                <h2 style={{ fontSize: '20px', whiteSpace: 'nowrap' }}>Social Media Marketing</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="roll__slide" style={{ padding: '0 20px' }}>
                <h2 style={{ fontSize: '20px', whiteSpace: 'nowrap' }}>Social Media Advertising</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="roll__slide" style={{ padding: '0 20px' }}>
                <h2 style={{ fontSize: '20px', whiteSpace: 'nowrap' }}>Social Media Analytics</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="roll__slide" style={{ padding: '0 20px' }}>
                <h2 style={{ fontSize: '20px', whiteSpace: 'nowrap' }}>Social Media Strategy</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="roll__slide" style={{ padding: '0 20px' }}>
                <h2 style={{ fontSize: '20px', whiteSpace: 'nowrap' }}>Social Media Planning</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="roll__slide" style={{ padding: '0 20px' }}>
                  <h2 style={{ fontSize: '20px', whiteSpace: 'nowrap' }}>Social Media Consulting</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="roll__slide" style={{ padding: '0 20px' }}>
                <h2 style={{ fontSize: '20px', whiteSpace: 'nowrap' }}>Social Media Training</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="roll__slide" style={{ padding: '0 20px' }}>
                <h2 style={{ fontSize: '20px', whiteSpace: 'nowrap' }}>Social Media Monitoring</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="roll__slide" style={{ padding: '0 20px' }}>
                <h2 style={{ fontSize: '20px', whiteSpace: 'nowrap' }}>Game Development</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="roll__slide" style={{ padding: '0 20px' }}>
                <h2 style={{ fontSize: '20px', whiteSpace: 'nowrap' }}>Application Development</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="roll__slide" style={{ padding: '0 20px' }}>
                <h2 style={{ fontSize: '20px', whiteSpace: 'nowrap' }}>Social Media Advertising</h2>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="roll__slide" style={{ padding: '0 20px' }}>
                <h2 style={{ fontSize: '20px', whiteSpace: 'nowrap' }}>Social Media Analytics</h2>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default DigitalAgencyRoll;
