import React, { useState } from 'react';

const openers = {
  חוף: ["האם הצלת קצת צדפים עבורנו?", "בואו נגש לחופשה יחד"],
  אירוע: ["זו החתונה שלנו בעתיד?", "שמלת חתונה יפה"],
  מסיבה: ["זו המסיבה שלנו בעתיד?", "שמלת מסיבה נהדרת"],
  חתונה: ["זו החתונה שלנו בעתיד?", "שמלת חתונה מרהיבה"],
  טיול: ["זה הטיול שלנו בעתיד?", "נופים מדהימים"],
  יומולדת: ["זה יומולדתך או שאתה פשוט שמח לראות אותי?", "עוגת יומולדת מהממת"],
  בגדים: ["הבגד הזה נראה מדהים עליך", "איזו מעצבת את?"],
  חיות: ["אם זה לא ילך בינינו אני עדיין אצא עם הכלב שלך", "החתול שלך נראה כמו מלך"],
  חופשות: ["איזה מקום בחו\"ל הכי השפיע עליך?", "נראה שאתה צריך חופשה"],
  אוכל: ["מה המנה האהובה עליך?", "נראה שאת מבינה באוכל"],
  אלכוהול: ["איזה סוג שתיה אתה הכי אוהב?", "נראה שאת מבינה ביין"]
};

function Openers() {
  const [openerType, setOpenerType] = useState(Object.keys(openers)[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // State to control menu visibility

  const handleNextOpener = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % openers[openerType].length);
  };

  const handleCopyOpener = () => {
    navigator.clipboard.writeText(openers[openerType][currentIndex])
      .then(() => alert("הועתק!"))
      .catch((err) => console.error('לא ניתן להעתיק: ', err));
  };

  return (
    <div className="custom-home-page">
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>☰</div>
      {menuOpen && (
        <div className="menu">
          <a href="/">דף הבית</a> {/* Adjust the href as needed for navigation */}
        </div>
      )}
      <div className="hero">
        <div className="cool-move">
          <h1>משפטי פתיחה</h1>
          <div className="opener-filter">
          {Object.keys(openers).map((type) => (
            <button key={type} onClick={() => { setOpenerType(type); setCurrentIndex(0); }}>
              {type}
            </button>
          ))}
          </div>
          <div className="response-container">
            <p>{openers[openerType][currentIndex]}</p>
            <button onClick={handleNextOpener}>פתח הבא</button>
            <button onClick={handleCopyOpener}>העתק</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Openers;
