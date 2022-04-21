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
          if (s.getAttribute('cardid') === cardid) {
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
          if (display.getAttribute('cardid') === cardid) {
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
        <div className="card-section is-active" cardid={cardCat} id="about">
          <div className="card-content">
            {(() => {
              if (!login) {
                return (
                  <div className="card-subtitle">CATEGORY DETAILS</div>
                );
              }
              return (
                <div className="card-subtitle">ABOUT</div>
              );
            })()}
            <p className="card-desc">{description}</p>
            {(() => {
              // If survey not taken or guest user
              if (cardscore === 0 || !login) {
                return (
                  <Link className="review-survey-button" to={`/take-survey/${cardCat}`}>
                    <button type="button" className="improvment-plan">TAKE SURVEY</button>
                  </Link>
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

        <div className="card-section" cardid={cardCat} id="experience">
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
                      <img src=".../../assets/alert.png" alt="alert icon" />
                      SURVEY INCOMPLETE.
                    </div>
                    <p className="card-incomplete-txt">
                      Please click on the button below to take and complete this survey.
                    </p>
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
                      <Link className="review-survey-button" to={`/take-survey/${cardCat}`} state={{ shouldUpdate: true }}>
                        <button type="button" className="update-survey">UPDATE SURVEY</button>
                      </Link>
                      <Link className="review-survey-button" to={`/review-survey/${cardCat}`}>
                        <button type="button" className="review-survey">REVIEW SURVEY</button>
                      </Link>
                      <div className="card-subtitle" style={{ paddingTop: '48px', paddingBottom: '20px' }}>IMPROVEMENT PLAN</div>
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

        <div className="card-section" cardid={cardCat} id="goals">
          <div className="card-content">
            {(() => {
              if (!Object.prototype.hasOwnProperty.call(goals, 'message') && Object.keys(goals).length > 0) {
                return (
                  <>
                    <h1 className="card-score-sm" style={{ paddingLeft: '40px' }}>{cardscore}</h1>
                    <div className="card-subtitle">GOALS</div>
                    <div>
                      {Object.keys(goals).slice(0, 3).map((goal) => (
                        <div className="card-goals" style={{ marginTop: '20px' }}>
                          <img src=".../../assets/benzene.png" alt="hexagon icon" />
                          {goal}
                        </div>
                      ))}
                      <div style={{ marginTop: '30px' }}>
                        <Link className="review-survey-button" to="/goals">
                          <button type="button" className="improvment-plan">VIEW GOALS</button>
                        </Link>
                      </div>
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
                  <div className="card-incomplete">
                    <img src=".../../assets/alert.png" alt="alert icon" />
                    NO GOALS EXIST YET.
                  </div>
                  <p className="card-incomplete-txt">
                    Click the button below to create your first
                    { ' '}
                    {cardcatid}
                    { ' ' }
                    goal.
                  </p>
                  <Link className="review-survey-button" to="/goals">
                    <button type="button" className="improvment-plan">GO TO GOALS</button>
                  </Link>
                </>
              );
            })()}
          </div>
        </div>

        {(() => {
          if (!login) {
            return null;
          }
          // only show other buttons for logged in users
          return (
            <div className="card-buttons">
              <button type="button" id={cardCat} data-section="#about" className="is-active" onClick={(e) => toggleClass(e, cardCat)}>ABOUT</button>
              <button type="button" id={cardCat} data-section="#experience" onClick={(e) => toggleClass(e, cardCat)}>EXPERIENCE</button>
              <button type="button" id={cardCat} data-section="#goals" onClick={(e) => toggleClass(e, cardCat)}>GOALS</button>
            </div>
          );
        })()}

      </div>
    </div>
  );
};

export default CategoryCard;
