import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

interface Props {
    data: any[];
}

const HorizontalCoverflow: React.FC<Props> = ({ data }) => {
    return (
        <div style={{ width: '100%', padding: '50px 0' }}>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                coverflowEffect={{
                    rotate: 30,     // Side cards ka angle
                    stretch: 0,      // Gap between cards
                    depth: 200,      // Depth effect
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
                style={{ paddingBottom: '50px' }}
            >
                {data.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <SwiperSlide
                            key={index}
                            style={{
                                width: '320px',
                                height: '400px',
                                background: '#0f1423',
                                borderRadius: '20px',
                                border: `1px solid ${item.color}40`,
                                display: 'flex',
                                flexDirection: 'column',
                                padding: '30px'
                            }}
                        >
                            <div style={{
                                width: '50px', height: '50px', borderRadius: '12px',
                                background: `${item.color}15`, display: 'flex',
                                alignItems: 'center', justifyContent: 'center', marginBottom: '25px'
                            }}>
                                <Icon size={24} color={item.color} />
                            </div>
                            <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '15px' }}>{item.title}</h3>
                            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>{item.desc}</p>

                            <div style={{ marginTop: 'auto', color: item.color, fontWeight: 'bold', fontSize: '14px' }}>
                                Learn More →
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            <style>{`
        .swiper-slide {
          transition: transform 0.3s;
        }
        .swiper-slide-active {
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
        }
        .swiper-pagination-bullet {
          background: #fff !important;
        }
      `}</style>
        </div>
    );
};

export default HorizontalCoverflow;