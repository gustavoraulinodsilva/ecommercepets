import React from 'react';
import "../sass/components/_griditems.scss";
import dogImage from "../assets/images/dog.png";
import { Link } from 'react-router-dom';

const GridItems: React.FC = () => {
    return(
        <div className="griditem">
            <div className="griditem__section">
                <div className="griditem__section__content">
                    <div className="griditem__section__content-texts">
                        <p className="question">Whats new?</p>
                        <h3 className="title">
                            Take A Look At Some Of Our Pets
                        </h3>
                    </div>
                    <a href='#' className="griditem__section__content-btn">
                        View More
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.33337 6.66666L11.6667 9.99999L8.33337 13.3333" stroke="#003459" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </a>
                </div>
                <div className="griditem__section__grid">
                    <Link to="/dog/pomeranian-white" className="griditem__section__grid__item">
                        <div className="image">
                            <img src={dogImage} alt="dog"/>
                        </div>
                        <div className="name">
                            <p>MO231</p> - <p>Pomeranian White</p>
                        </div>
                        <div className="info">
                            <p>Gene: <strong>Male</strong></p>
                            <p>Age: <strong>2 years</strong></p>
                        </div>
                        <div className="price">
                            <p><strong>7.900.000 VND</strong></p>
                        </div>
                    </Link>
                    <Link to="/dog/pomeranian-white" className="griditem__section__grid__item">
                        <div className="image">
                            <img src={dogImage} alt="dog"/>
                        </div>
                        <div className="name">
                            <p>MO231</p> - <p>Pomeranian White</p>
                        </div>
                        <div className="info">
                            <p>Gene: <strong>Male</strong></p>
                            <p>Age: <strong>2 years</strong></p>
                        </div>
                        <div className="price">
                            <p><strong>7.900.000 VND</strong></p>
                        </div>
                    </Link>
                    <Link to="/dog/pomeranian-white" className="griditem__section__grid__item">
                        <div className="image">
                            <img src={dogImage} alt="dog"/>
                        </div>
                        <div className="name">
                            <p>MO231</p> - <p>Pomeranian White</p>
                        </div>
                        <div className="info">
                            <p>Gene: <strong>Male</strong></p>
                            <p>Age: <strong>2 years</strong></p>
                        </div>
                        <div className="price">
                            <p><strong>7.900.000 VND</strong></p>
                        </div>
                    </Link>
                    <Link to="/dog/pomeranian-white" className="griditem__section__grid__item">
                        <div className="image">
                            <img src={dogImage} alt="dog"/>
                        </div>
                        <div className="name">
                            <p>MO231</p> - <p>Pomeranian White</p>
                        </div>
                        <div className="info">
                            <p>Gene: <strong>Male</strong></p>
                            <p>Age: <strong>2 years</strong></p>
                        </div>
                        <div className="price">
                            <p><strong>7.900.000 VND</strong></p>
                        </div>
                    </Link>
                    <Link to="/dog/pomeranian-white" className="griditem__section__grid__item">
                        <div className="image">
                            <img src={dogImage} alt="dog"/>
                        </div>
                        <div className="name">
                            <p>MO231</p> - <p>Pomeranian White</p>
                        </div>
                        <div className="info">
                            <p>Gene: <strong>Male</strong></p>
                            <p>Age: <strong>2 years</strong></p>
                        </div>
                        <div className="price">
                            <p><strong>7.900.000 VND</strong></p>
                        </div>
                    </Link>
                    <Link to="/dog/pomeranian-white" className="griditem__section__grid__item">
                        <div className="image">
                            <img src={dogImage} alt="dog"/>
                        </div>
                        <div className="name">
                            <p>MO231</p> - <p>Pomeranian White</p>
                        </div>
                        <div className="info">
                            <p>Gene: <strong>Male</strong></p>
                            <p>Age: <strong>2 years</strong></p>
                        </div>
                        <div className="price">
                            <p><strong>7.900.000 VND</strong></p>
                        </div>
                    </Link>
                    <Link to="/dog/pomeranian-white" className="griditem__section__grid__item">
                        <div className="image">
                            <img src={dogImage} alt="dog"/>
                        </div>
                        <div className="name">
                            <p>MO231</p> - <p>Pomeranian White</p>
                        </div>
                        <div className="info">
                            <p>Gene: <strong>Male</strong></p>
                            <p>Age: <strong>2 years</strong></p>
                        </div>
                        <div className="price">
                            <p><strong>7.900.000 VND</strong></p>
                        </div>
                    </Link>
                    <Link to="/dog/pomeranian-white" className="griditem__section__grid__item">
                        <div className="image">
                            <img src={dogImage} alt="dog"/>
                        </div>
                        <div className="name">
                            <p>MO231</p> - <p>Pomeranian White</p>
                        </div>
                        <div className="info">
                            <p>Gene: <strong>Male</strong></p>
                            <p>Age: <strong>2 years</strong></p>
                        </div>
                        <div className="price">
                            <p><strong>7.900.000 VND</strong></p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default GridItems;