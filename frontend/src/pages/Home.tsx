import React from "react";
import "../sass/pages/_home.scss";
import bannerImage from "../assets/images/homebanner.png";

const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="home__banner">
        <div className="home__banner__content">
          <div className="home__banner__content__titles">
            <h1>One More Friend</h1>
            <h3>Thousands More Fun!</h3>
          </div>
          <p className="home__banner__content__desc">
            Having a pet means you have more joy, a new friend, a happy person
            who will always be with you to have fun. We have 200+ different pets
            that can meet your needs!
          </p>
          <div className="home__banner__content__btn">
            <a href="" className="home__banner__content__btn__view">
              View Intro
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"/>
              </svg>
            </a>
            <a href="" className="home__banner__content__btn__explore">
              Explore Now
            </a>
          </div>
        </div>
        <div className="home__banner__image">
          <img src={bannerImage} alt="banner"/>
        </div>
      </div>
    </div>
  );
};

export default Home;
