import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/categoryCard.css';

const CategoryCard = function CategoryCardFunc({
  cardID, category, score, status, description,
}) {
  const buttons = document.querySelectorAll('.card-buttons button');
  const sections = document.querySelectorAll('.card-section');
  let cards = document.querySelectorAll('.card');

  useEffect(() => {
  }, []);

  // eslint-disable-next-line no-unused-vars
  const [dummy, setDummy] = useState('');

  const toggleClass = (e, cardid) => {
    while (cards.length === 0) {
      setDummy('change happened');
      cards = document.querySelectorAll('.card');
    }

    const targetSection = e.target.getAttribute('data-section');
    const displaySections = document.querySelectorAll(targetSection);
    cards.forEach((card) => {
      if (card.id === cardid) {
        if (targetSection !== '#about') {
          card.classList.add('is-active');
        } else {
          card.classList.remove('is-active');
        }
        card.setAttribute('data-state', targetSection);

        sections.forEach((s) => {
          if (s.getAttribute('cardID') === cardid) {
            s.classList.remove('is-active');
          }
        });
        buttons.forEach((b) => {
          if (b.id === cardid) {
            b.classList.remove('is-active');
          }
        });

        e.target.classList.add('is-active');
        displaySections.forEach((display) => {
          if (display.getAttribute('cardID') === cardid) {
            const section = display;
            section.classList.add('is-active');
          }
        });
      }
    });
  };

  return (
    <div className="card" id={cardID} data-state="#about">
      <div className="card-header">
        <div className="card-cover" />
        <div className="card-avatar" />
        <h1 className="card-score" variant="h2">{score}</h1>
        <h1 className="card-categoryname">{category}</h1>
        <h2 className="card-resilience">resilience</h2>
      </div>

      <div className="card-main">
        <div className="card-section is-active" cardID={cardID} id="about">
          <div className="card-content">
            <div className="card-subtitle">ABOUT</div>
            <p className="card-desc">{description}</p>
            <Link className="review-survey-button" to={`/description/${cardID}`}>
              <button type="button" className="improvment-plan">VIEW CATEGORY DETAILS</button>
            </Link>
          </div>
        </div>

        <div className="card-section" cardID={cardID} id="experience">
          <div className="card-content">
            {(() => {
              // survey not completed yet.
              if (status === 'in-progress') {
                return (
                  <>
                    <div className="card-incomplete">
                      <img src="https://img.icons8.com/external-xnimrodx-lineal-gradient-xnimrodx/50/000000/external-alert-warehouse-xnimrodx-lineal-gradient-xnimrodx.png" alt="alert icon" />
                      SURVEY INCOMPLETE.
                    </div>
                    <body className="card-incomplete-txt">
                      Please click on the button below to take and complete this survey.
                    </body>
                    <Link className="take-survey-button" to={`/take-survey/${cardID}`}>
                      <button type="button" className="take-survey">TAKE SURVEY</button>
                    </Link>
                  </>
                );
              // survey completed.
              }
              return (
                <>
                  <h1 className="card-score-sm" style={{ paddingLeft: '40px' }}>{score}</h1>
                  <div className="card-subtitle">SURVEY</div>
                  <Link className="review-survey-button" to={`/take-survey/${cardID}`}>
                    <button type="button" className="take-survey">RETAKE SURVEY</button>
                  </Link>
                  <button type="button" className="update-survey">UPDATE SURVEY</button>
                  <div className="card-subtitle" style={{ paddingTop: '40px' }}>IMPROVEMENT PLAN</div>
                  <button type="button" className="improvment-plan">VIEW IMPROVEMENT PLAN</button>
                </>
              );
            })()}
          </div>
        </div>

        <div className="card-section" cardID={cardID} id="contact">
          <div className="card-content">
            <h1 className="card-score-sm" style={{ paddingLeft: '40px' }}>{score}</h1>
            <div className="card-subtitle">GOALS</div>
            <div className="card-contact-wrapper">
              <div className="card-contact">
                <img src="https://img.icons8.com/nolan/64/benzene-ring.png" alt="hexagon icon" />
                Acheive Category Score Above 90%.
              </div>
              <div className="card-contact">
                <img src="https://img.icons8.com/nolan/64/benzene-ring.png" alt="hexagon icon" />
                Reach the &apos;Great&lsquo; Milestone.
              </div>
              <div className="card-contact">
                <img src="https://img.icons8.com/nolan/64/benzene-ring.png" alt="hexagon icon" />
                Complete all High Priority Tasks.
              </div>
            </div>
          </div>
        </div>

        <div className="card-buttons">
          <button type="button" id={cardID} data-section="#about" className="is-active" onClick={(e) => toggleClass(e, cardID)}>ABOUT</button>
          <button type="button" id={cardID} data-section="#experience" onClick={(e) => toggleClass(e, cardID)}>EXPERIENCE</button>
          <button type="button" id={cardID} data-section="#contact" onClick={(e) => toggleClass(e, cardID)}>GOALS</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
