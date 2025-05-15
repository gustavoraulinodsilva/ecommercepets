import React from "react";
import "../sass/components/_adoptionbanner.scss";

interface AdoptionBannerProps {
  variant: "paw" | "friend";
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

const AdoptionBanner: React.FC<AdoptionBannerProps> = ({
  variant,
  image,
  title,
  subtitle,
  description
}) => {
  return (
    <div className={`adoption-banner adoption-banner--${variant}`}>
      {variant === "friend" ? (
        <>
          <div className="adoption-banner__image-container">
            <img src={image} alt="Pet adoption" className="adoption-banner__image" />
          </div>
          <div className="adoption-banner__content">
            <h2 className="adoption-banner__title">{title}</h2>
            <h3 className="adoption-banner__subtitle">{subtitle}</h3>
            <p className="adoption-banner__description">{description}</p>
            <div className="adoption-banner__buttons">
              <a href="#" className="adoption-banner__btn adoption-banner__btn--outline">
                View Intro
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6.66663 4.66667L9.99996 8L6.66663 11.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="#" className="adoption-banner__btn adoption-banner__btn--primary">
                Explore Now
              </a>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="adoption-banner__content">
            <h2 className="adoption-banner__title">
              {title} <span className="adoption-banner__paw-icon">🐾</span>
            </h2>
            <h3 className="adoption-banner__subtitle">{subtitle}</h3>
            <p className="adoption-banner__description">{description}</p>
            <div className="adoption-banner__buttons">
              <a href="#" className="adoption-banner__btn adoption-banner__btn--primary">
                Explore Now
              </a>
              <a href="#" className="adoption-banner__btn adoption-banner__btn--outline">
                View Intro
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6.66663 4.66667L9.99996 8L6.66663 11.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="adoption-banner__image-container">
            <img src={image} alt="Pet adoption" className="adoption-banner__image" />
          </div>
        </>
      )}
    </div>
  );
};

export default AdoptionBanner;

