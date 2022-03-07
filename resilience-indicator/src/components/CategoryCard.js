import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import '../styles/categoryCard.css';

const CategoryCard = function CategoryCardFunc({
  cardcatid, category, cardscore, icon, login, description,
}) {
  const buttons = document.querySelectorAll('.card-buttons button');
  const sections = document.querySelectorAll('.card-section');
  let cards = document.querySelectorAll('.card');
  const [goals, setGoals] = useState({});

  useEffect(() => {
    Axios
      .get(`/api/goals/${cardcatid}`, { withCredentials: true })
      .then((res) => {
        setGoals(res.data);
      });
  }, []);

  const [cardCat, setCardCat] = useState('initialize');
  useEffect(() => {
    setCardCat(cardcatid);
  }, []);

  const toggleClass = (e, cardid) => {
    while (cards.length === 0) {
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
    <div className="card" id={cardCat} data-state="#about">
      <div className="card-header">
        <div className="card-cover" />
        <div className="card-avatar" />
        {(() => {
          // survey not yet completed.
          if (cardscore === 0) {
            return (
              <div className="card-icon">
                <img src={icon} alt="category icon" />
              </div>
            );
          }
          // survey completed.
          return (
            <h1 className="card-score" variant="h2">{cardscore}</h1>
          );
        })()}
        <h1 className="card-categoryname">{category}</h1>
        <h2 className="card-resilience">resilience</h2>
      </div>

      <div className="card-main">
        <div className="card-section is-active" cardID={cardCat} id="about">
          <div className="card-content">
            <div className="card-subtitle">ABOUT</div>
            <p className="card-desc">{description}</p>
            {(() => {
              // guest user
              if (!login) {
                return (
                  <>
                  </>
                );
              }
              return (
                <Link className="review-survey-button" to={`/description/${cardCat}`} state={{ score: cardscore }}>
                  <button type="button" className="improvment-plan">VIEW CATEGORY DETAILS</button>
                </Link>
              );
            })()}
          </div>
        </div>

        <div className="card-section" cardID={cardCat} id="experience">
          <div className="card-content">
            {(() => {
              // survey not completed yet.
              if (cardscore === 0) {
                return (
                  <>
                    <div className="card-icon-sm">
                      <img src={icon} alt="category icon" />
                    </div>
                    <div className="card-incomplete">
                      <img src="https://img.icons8.com/external-xnimrodx-lineal-gradient-xnimrodx/50/000000/external-alert-warehouse-xnimrodx-lineal-gradient-xnimrodx.png" alt="alert icon" />
                      SURVEY INCOMPLETE.
                    </div>
                    <body className="card-incomplete-txt">
                      Please click on the button below to take and complete this survey.
                    </body>
                    <Link className="take-survey-button" to={`/take-survey/${cardCat}`}>
                      <button type="button" className="take-survey">TAKE SURVEY</button>
                    </Link>
                  </>
                );
              }
              // survey completed.
              return (
                <>
                  <h1 className="card-score-sm" style={{ paddingLeft: '40px' }}>{cardscore}</h1>
                  <div className="card-subtitle">SURVEY</div>
                  <Link className="review-survey-button" to={`/take-survey/${cardCat}`}>
                    <button type="button" className="take-survey">RETAKE SURVEY</button>
                  </Link>
                  {login && (
                    <div>
                      <button type="button" className="update-survey">UPDATE SURVEY</button>
                      <div className="card-subtitle" style={{ paddingTop: '40px' }}>IMPROVEMENT PLAN</div>
                      <Link className="review-survey-button" to={`/improvement-plan/${cardCat}`}>
                        <button type="button" className="improvment-plan">VIEW IMPROVEMENT PLAN</button>
                      </Link>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>

        <div className="card-section" cardID={cardCat} id="contact">
          <div className="card-content">
            {(() => {
              if (!Object.prototype.hasOwnProperty.call(goals, 'message') && Object.keys(goals).length > 0) {
                return (
                  <>
                    <h1 className="card-score-sm" style={{ paddingLeft: '40px' }}>{cardscore}</h1>
                    <div className="card-subtitle">GOALS</div>
                    <div className="card-contact-wrapper">
                      {Object.keys(goals).slice(0, 3).map((goal) => (
                        <div className="card-contact">
                          <img src="https://img.icons8.com/nolan/64/benzene-ring.png" alt="hexagon icon" />
                          {goal}
                        </div>
                      ))}
                      <Link className="review-survey-button" to="/goals">
                        <button type="button" className="improvment-plan">VIEW GOALS</button>
                      </Link>
                    </div>
                  </>
                );
              }
              // survey not completed yet (or a guest user right now).
              if (!login) {
                return (
                  <>
                    <div className="card-icon-sm">
                      <img src={icon} alt="category icon" />
                    </div>
                    <div className="card-incomplete-txt" style={{ fontSize: '16px', fontWeight: 'bolder', color: 'rgb(80,80,80)' }}>
                      This feature is unavailable for guest users.
                    </div>
                    <div className="card-incomplete-txt" style={{ fontSize: '13px' }}>
                      Please consider
                      creating an account to unlock additional features such as
                      setting goals, reaching and sharing achievements, and receiving a
                      personally curated improvement plan.
                    </div>
                  </>
                );
              }
              // It is a user but they haven't set any goals
              return (
                <>
                  <h1 className="card-score-sm" style={{ paddingLeft: '40px' }}>{cardscore}</h1>
                  <div className="card-subtitle">GOALS</div>
                  <div className="card-contact-wrapper">
                    <div
                      className="card-incomplete-txt"
                      style={
                        {
                          fontSize: '14px',
                          fontWeight: 'bolder',
                          color: 'rgb(80,80,80)',
                        }
                      }
                    >
                      You have not set any goals for this category yet!
                    </div>
                    <div className="card-incomplete-txt" style={{ fontSize: '14px' }}>
                      Click the button below to create your first
                      { ' '}
                      {cardcatid}
                      { ' ' }
                      goal.
                    </div>
                    <Link className="review-survey-button" to="/goals">
                      <button type="button" className="improvment-plan">GO TO GOALS</button>
                    </Link>
                  </div>
                </>
              );
            })()}
          </div>
        </div>

        <div className="card-buttons">
          <button type="button" id={cardCat} data-section="#about" className="is-active" onClick={(e) => toggleClass(e, cardCat)}>ABOUT</button>
          <button type="button" id={cardCat} data-section="#experience" onClick={(e) => toggleClass(e, cardCat)}>EXPERIENCE</button>
          <button type="button" id={cardCat} data-section="#contact" onClick={(e) => toggleClass(e, cardCat)}>GOALS</button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
