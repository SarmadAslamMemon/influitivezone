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
    role: "CEO, Digital Solutions",
    image: "/assets/imgs/testimonial/reviewer/amelia-ada.jpeg",
    title: "Client's Feedback",
    feedback: "Our online presence changed completely because of their digital marketing plan.  In just a few months, we saw a huge rise in traffic and leads.  The team really knows how to reach the right people.",
    rating: 5
  },
  {
    id: 2,
    name: "Ana kulauzov",
    role: "Marketing Director",
    image: "/assets/imgs/testimonial/reviewer/ana-kulauzov.jpeg",
    title: "Client's Feedback",
    feedback: "Omg, I had such a great experience with this company! They understood exactly what I wanted and delivered it quickly, with great quality, work , I am a customer for life!",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Crawley",
    role: "Founder, StartupXYZ",
    image: "/assets/imgs/testimonial/reviewer/emma-crawley.jpeg",
    title: "Client's Feedback",
    feedback: "I entrusted them with our digital marketing, and the results were outstanding. Thanks to their social media and SEO expertise, our brand is now more visible and engaging than ever before. In just three months, they delivered incredible results.",
    rating: 5
  },
  {
    id: 4,
    name: "Henry G. Rivera",
    role: "CTO, InnovateLab",
    image: "/assets/imgs/testimonial/reviewer/henry-g-rivera.jpg",
    title: "Client's Feedback",
    feedback: "They went above and beyond by creating a beautifully designed, user-friendly website for us. It loads fast, looks perfect on every device, and truly captures our brand's personality. Our clients absolutely love the fresh new look.",
    rating: 5
  },
  {
    id: 5,
    name: "Tanner Lewis",
    role: "Project Manager",
    image: "/assets/imgs/testimonial/reviewer/tanner-lewis.jpeg",
    title: "Client's Feedback",
    feedback: "Working with them on our website was honestly such a joy! From the very first meeting to the final launch, everything felt easy, collaborative, and exciting. They truly listened to our ideas and turned them into something even better than we imagined.",
    rating: 5
  }
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
                             <div className="testimonial__author-info">
                               <h3 className="testimonial__author">{client.name}</h3>
                             </div>
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
