import { FreeMode, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useState, useEffect } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/free-mode";

// Client testimonials data
const clientTestimonials = [
  {
    id: 1,
    name: "Amelia Ada",
    // role: "CEO, Agency",
    image: "/assets/imgs/testimonial/reviewer/amelia-ada.jpeg",
    title: "Client's Feedback",
    feedback: "Our online presence changed completely because of their digital marketing plan.  In just a few months, we saw a huge rise in traffic and leads.  The team really knows how to reach the right people."
  },
  {
    id: 2,
    name: "Ana kulauzov",
    // role: "Marketing Director, TechCorp",
    image: "/assets/imgs/testimonial/reviewer/ana-kulauzov.jpeg",
    title: "Client's Feedback",
    feedback: "Omg, I had such a great experience with this company! They understood exactly what I wanted and delivered it quickly, with great quality, work , I am a customer for life!"
  },
  {
    id: 3,
    name: "Emma Crawley",
    // role: "Founder, StartupXYZ",
    image: "/assets/imgs/testimonial/reviewer/emma-crawley.jpeg",
    title: "Client's Feedback",
    feedback: "Professional, imaginative, and goal-oriented! Their social media and SEO efforts have greatly increased the visibility of our brand. For us, they made marketing feel effortless."
  },
  {
    id: 4,
    name: "Henry G. Rivera",
    // role: "CTO, InnovateLab",
    image: "/assets/imgs/testimonial/reviewer/henry-g-rivera.jpeg",
    title: "Client's Feedback",
    feedback: "They exceeded our expectations by creating a user-friendly website. On all devices, the design is responsive, and quick to load. Our clients adore the updated appearance!"
  },
  {
    id: 5,
    name: "Tanner Lewis",
    // role: "CTO, InnovateLab",
    image: "/assets/imgs/testimonial/reviewer/tanner-lewis.jpeg",
    title: "Client's Feedback",
    feedback: "From planning to launch, the web development process was smooth and transparent. They built us a custom solution that perfectly fits our business needs. Highly recommended!"
  },
  // {
  //   id: 6,
  //   name: "Amelia Ada",
  //   role: "CTO, InnovateLab",
  //   image: "/assets/imgs/testimonial/reviewer/amelia-ada.jpeg",
  //   title: "Client's Feedback",
  //   feedback: "The level of professionalism and attention to detail shown by the Influitive Zone team is remarkable. They delivered our project on time and within budget, exceeding our expectations."
  // }
];

const AboutTestimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeClient, setActiveClient] = useState(clientTestimonials[0]);

  const handleSlideChange = (swiper) => {
    const newIndex = swiper.realIndex;
    setActiveIndex(newIndex);
    setActiveClient(clientTestimonials[newIndex]);
  };

  return (
    <>
      <section className="testimonial__area-2">
        <div className="container g-0 line pb-140">
          <span className="line-3"></span>

           <div className="row g-0">
             <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4">
               <div className="testimonial__client-images">
                 <div className="testimonial__client-image-wrapper">
                   <Image
                     src={activeClient.image}
                     alt={activeClient.name}
                     width={350}
                     height={450}
                     className="testimonial__client-image"
                     priority={true}
                   />
                   <div className="testimonial__client-overlay">
                     <div className="testimonial__client-info">
                       <h3 className="testimonial__client-name">{activeClient.name}</h3>
                       <p className="testimonial__client-role">{activeClient.role}</p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>

             <div className="col-xxl-8 col-xl-8 col-lg-8 col-md-8">
               <div className="testimonial__slider-wrapper-2">
                 <div className="testimonial__slider">
                   <Swiper
                     modules={[FreeMode, Navigation]}
                     spaceBetween={0}
                     slidesPerView={1}
                     freeMode={true}
                     loop={true}
                     speed={2000}
                     autoplay={{
                       delay: 5000,
                       disableOnInteraction: false,
                     }}
                     navigation={{
                       nextEl: ".next-button",
                       prevEl: ".prev-button",
                     }}
                     onSlideChange={handleSlideChange}
                   >
                     {clientTestimonials.map((client) => (
                       <SwiperSlide key={client.id}>
                         <div className="testimonial__slide">
                           <div className="testimonial__inner-2">
                             <h2 className="testimonial__title-2">
                               {client.title}
                             </h2>
                             <p className="testimonial__text-2">
                               {client.feedback}
                             </p>
                             <h3 className="testimonial__author">{client.name}</h3>
                             <h4 className="testimonial__role">{client.role}</h4>
                           </div>
                         </div>
                       </SwiperSlide>
                     ))}
                   </Swiper>
                 </div>

                 <div className="testimonial__pagination">
                   <div style={{ cursor: "pointer" }} className="prev-button">
                     <i className="fa-solid fa-arrow-right"></i>
                   </div>
                   <div style={{ cursor: "pointer" }} className="next-button">
                     <i className="fa-solid fa-arrow-left"></i>
                   </div>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </section>
    </>
  );
};

export default AboutTestimonial;
