import { FreeMode, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

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
    feedback: "Their digital marketing strategy completely transformed our online presence. Within just a few months, we saw a huge increase in traffic and leads. The team really understands how to target the right audience."
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
    feedback: "Professional, creative, and result-driven! Our brand visibility has grown significantly thanks to their social media and SEO campaigns. They made marketing feel effortless for us."
  },
  {
    id: 4,
    name: "Henry G. Rivera",
    // role: "CTO, InnovateLab",
    image: "/assets/imgs/testimonial/reviewer/henry-g-rivera.jpeg",
    title: "Client's Feedback",
    feedback: "We wanted a modern, user-friendly website and they delivered beyond expectations. The design is sleek, fast, and responsive on all devices. Our customers love the new look!"
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
                     src={clientTestimonials[0].image}
                     alt={clientTestimonials[0].name}
                     width={350}
                     height={450}
                     className="testimonial__client-image"
                     priority={true}
                   />
                   <div className="testimonial__client-overlay">
                     <div className="testimonial__client-info">
                       <h3 className="testimonial__client-name">{clientTestimonials[clientTestimonials.length - 1].name}</h3>
                       <p className="testimonial__client-role">{clientTestimonials[0].role}</p>
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
                     onSlideChange={(swiper) => {
                       // Update image when slide changes
                       const activeIndex = swiper.realIndex;
                       const activeClient = clientTestimonials[activeIndex];
                       
                       // Update image source
                       const imgElement = document.querySelector('.testimonial__client-image');
                       const nameElement = document.querySelector('.testimonial__client-name');
                       const roleElement = document.querySelector('.testimonial__client-role');
                       
                       if (imgElement) imgElement.src = activeClient.image;
                       if (nameElement) nameElement.textContent = activeClient.name;
                       if (roleElement) roleElement.textContent = activeClient.role;
                     }}
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
