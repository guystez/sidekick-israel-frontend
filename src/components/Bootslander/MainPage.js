import React from 'react';
import { Link } from 'react-router-dom';

// import "./assets/vendor/aos/aos.css";
import "./assets/vendor/bootstrap/css/bootstrap-grid.css"
import "./assets/vendor/bootstrap/css/bootstrap.min.css";
import "./assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "./assets/vendor/boxicons/css/boxicons.min.css";
import "./assets/vendor/glightbox/css/glightbox.min.css";
import "./assets/vendor/remixicon/remixicon.css";
import "./assets/vendor/swiper/swiper-bundle.min.css";
import "./assets/css/style.css";
import "./assets/img/messages-dream-gold.png";
import messageImage from './assets/img/messages-dream-gold.png';
import Spicy from './assets/img/spicy-meter.png';
// JavaScript imports
// import 'react-app-polyfill/ie11';
// import 'react-app-polyfill/stable';
// import 'aos/dist/aos.css';
// import 'glightbox/dist/css/glightbox.min.css';
// import 'swiper/swiper-bundle.min.css';
// import "./assets/js/main";

// import "./assets/vendor/php-email-form/validate";
// import "./assets/vendor/purecounter/purecounter_vanilla";
// import "./assets/vendor/aos/aos";
// import "./assets/vendor/bootstrap/js/bootstrap.bundle";
// import "./assets/vendor/glightbox/js/glightbox";
// // // import "./assets/vendor/swiper/swiper-bundle.min";
// // import Swiper from "./assets/vendor/swiper/swiper-bundle.min.js"



function MainPage() {
  return (
    <>
      <meta content="" name="description" />
      <meta content="" name="keywords" />

      {/* <script src="assets/vendor/php-email-form/validate.js"></script>
      <script src="assets/vendor/purecounter/purecounter_vanilla.js"></script>
      <script src="assets/vendor/aos/aos.js"></script>
      <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
      <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
      <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
      <script src="assets/js/main.js"></script> */}

      <link rel="icon" href="assets/img/favicon.png" />
      <link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png" />

      <header id="header" className="fixed-top d-flex align-items-center header-transparent">
        <div className="container d-flex align-items-center justify-content-between">
          <div className="logo">

            {/* <h1><a href="index.html"><span>ChatMates.AI</span></a></h1> */}
            <a href="index.html"></a>
            <img src="assets/img/logo.png" alt="" className="img-fluid" />
          </div>
          <nav id="navbar" className="navbar">
            <ul>
              <li><Link to="/"  style={{ color: 'rgb(129, 239, 156)' }} >אפליקציה</Link></li>
              <li><a className="nav-link scrollto" href="#hero">בית</a></li>
              <li><a className="nav-link scrollto" href="#about">עלינו</a></li>
              <li><a className="nav-link scrollto" href="#features">מה חדש</a></li>
              <li><a className="nav-link scrollto" href="#pricing">מחירים</a></li>
              <li><a className="nav-link scrollto" href="#contact">צור קשר</a></li>
            </ul>
            {/* <i className="bi bi-list mobile-nav-toggle"></i> */}
          </nav>
        </div>
      </header>
      

      <section id="hero">
      <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-7 pt-5 pt-lg-0 order-2 order-lg-1 d-flex align-items-center">
              <div data-aos="zoom-out">
                <h1>לשדרג את השיחות שלך בעולם ההיכרויות<span> - ChatMates.AI</span></h1>
                <h2>תפסיק לשבור את הראש ותן לנו לעשות לך את העבודה</h2>
                <div className="text-center text-lg-start">
                  <Link to="/Main" className="btn-get-started scrollto">בוא נתחיל</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4 order-1 order-lg-2 hero-img" data-aos="zoom-out" data-aos-delay="300">
            {/* <img  src="assets/img/messages-dream-gold.png" className="img-fluid animated" alt="" /> */}
            <img src={messageImage} style={{width:'900px'}} className="img-fluid animated" alt="Description" />
            </div>
          </div>
        </div>

        <svg className="hero-waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28 " preserveAspectRatio="none">
          <defs>
            <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="wave1">
            <use xlinkHref="#wave-path" x="50" y="3" fill="rgba(255,255,255, .1)" />
          </g>
          <g className="wave2">
            <use xlinkHref="#wave-path" x="50" y="0" fill="rgba(255,255,255, .2)" />
          </g>
          <g className="wave3">
            <use xlinkHref="#wave-path" x="50" y="9" fill="#fff" />
          </g>
        </svg>

      </section>

      <main id="main">

        <section id="about" className="about">
          <div className="container-fluid">

            <div className="row">
              <div className="col-xl-5 col-lg-6 video-box d-flex justify-content-center align-items-stretch" data-aos="fade-right">

              </div>

              <div className="col-xl-7 col-lg-6 icon-boxes d-flex flex-column align-items-stretch justify-content-center py-5 px-lg-5" data-aos="fade-left">
                <h3>מה אנחנו עושים?</h3>
                <p>אנחנו יודעם כמה תחום הדייטינג קשה, במיוחד בעולם התחרותי של אפליקציות ההיכרויות. ששם אם המראה לא קובע, אז לפחות יכולת הטקסטינג. ולכן החלטנו לפתח מערכת שתעזור לך לשלוח את התגובה הטובה ביותר כדי שתוכל לקבל הצלחות יותר מאי פעם. והנה מה שאנחנו מספקים :</p>

                <div className="icon-box" data-aos="zoom-in" data-aos-delay="100">
                  <div className="icon"><i className="bx bx-fingerprint"></i></div>
                  <h4 className="title"><a href="">מענה מיידי לפי צילום מסך</a></h4>
                  <p className="description">העלה צילום מסך של השיחה וקבל תגובה מתאימה מה אייאיי שלנו במהירות ושנינות - לעולם לא תתקע בלי מה להגיד</p>
                </div>

                <div className="icon-box" data-aos="zoom-in" data-aos-delay="200">
                  <div className="icon"><i className="bx bx-gift"></i></div>
                  <h4 className="title"><a href="">משפטי פתיחה מותאמים אישית</a></h4>
                  <p className="description">אינספור משפטי פתיחה לפי נושאים, כדי שתוכל להתחיל בקלות כל שיחה חדשה באפליקציות ההיכירויות</p>
                </div>

                <div className="icon-box" data-aos="zoom-in" data-aos-delay="300">
                  <div className="icon"><i className="bx bx-atom"></i></div>
                  <h4 className="title"><a href="">מחסן קסמים</a></h4>
                  <p className="description">תוכל לשמור את כל המשפטים שאהבת מהאייאיי והם יהיו זמינים לך בכל רגע נתון בפרופיל האישי שלך לשימוש חוזר</p>
                </div>

                <div className="icon-box" data-aos="zoom-in" data-aos-delay="300">
                  <div className="icon"><i className="bx bx-atom"></i></div>
                  <h4 className="title"><a href="">שינויים ללא הגבלה</a></h4>
                  <p className="description">תוכל לשנות את התגובה של האייאיי כמה פעמים שרק תרצה עד שתמצא תגובה שמספיק טובה לך על בסיס השיחה בצילום המסך שהעלת</p>
                </div>

              </div>
            </div>

          </div>
        </section>


        <section style={{ backgroundColor: 'rgb(154, 23, 242)' }} id="features" className="features">

          <div className="container">
            <div className="video-box d-flex justify-content-center align-items-stretch" data-aos="fade-right">

              <div className="section-title" data-aos="fade-up">
                <p style={{ color: 'aliceblue' }}>מד חריפות</p>
                <h3 style={{ color: 'aliceblue' }}>תתחיל לתבלן את ההודעות שלך בקצת טעם!</h3>
              </div>
              <div className="col-md-4" data-aos="fade-right">
                <img src={Spicy} className="img-fluid" alt="" />
              </div>

            </div>
          </div>
        </section>

        <section id="counts" className="counts">
          <div className="container">

            <div className="row" data-aos="fade-up">

              <div className="col-lg-3 col-md-6">
                <div className="count-box">
                  <i className="bi bi-emoji-smile"></i>
                  <span data-purecounter-start="0" data-purecounter-end="247" data-purecounter-duration="1" className="purecounter"></span>
                  <p>לקוחות מרוצים</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mt-5 mt-md-0">
                <div className="count-box">
                  <i className="bi bi-journal-richtext"></i>
                  <span data-purecounter-start="0" data-purecounter-end="200" data-purecounter-duration="1" className="purecounter"></span>
                  <p>משפטי פתיחה</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                <div className="count-box">
                  <i className="bi bi-headset"></i>
                  <span data-purecounter-start="0" data-purecounter-end="7463" data-purecounter-duration="1" className="purecounter"></span>
                  <p>משפטי אייאיי שנשמרו</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 mt-5 mt-lg-0">
                <div className="count-box">
                  <i className="bi bi-people"></i>
                  <span data-purecounter-start="0" data-purecounter-end="10" data-purecounter-duration="1" className="purecounter"></span>
                  <p>שנות נסיון בדייטינג</p>
                </div>
              </div>

            </div>

          </div>
        </section>

        <section id="details" className="details">
          <div className="container">
            <div className="row content">
              <div className="col-md-4" data-aos="fade-right">
                <img src="assets/img/details-1.png" className="img-fluid" alt="" />
              </div>
              <div className="col-md-8 pt-4" data-aos="fade-up">
                <h3>עם כלים חכמים וטכנולוגיה מתקדמת, אין יותר מה לדאוג – ההודעה הבאה שלך יכולה להיות הפתח לקשר שחלמת עליו</h3>
                <p className="fst-italic">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
                </p>
                <ul>
                  <li><i className="bi bi-check"></i> היחידים בעולם שמספקים שירותי אייאיי לדייטינג בעברית </li>
                  <li><i className="bi bi-check"></i> תגובה חכמה על בסיס כל השיחה שלך</li>
                  <li><i className="bi bi-check"></i> שנים של נסיון בעולם הדייטינג וההיכירויות</li>
                  <li><i className="bi bi-check"></i> הרשמה ללא עלות עם 3 נסיונות מתנה</li>
                  <li><i className="bi bi-check"></i> שימוש קל מהיר ופשוט לכל משתמש</li>
                </ul>
                <h2>
                  התחל לשדרג את השיחות שלך כבר היום – הרשמו בחינם ותתחילו לראות את ההבדל
                </h2>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="pricing">
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>מחירים</h2>
              <p>המחירים שלנו</p>
            </div>
            <div className="row" data-aos="fade-left">
              <div className="col-lg-3 col-md-6 mt-4 mt-md-0">
                <div className="box featured" data-aos="zoom-in" data-aos-delay="200">
                  <h3>3 שימושים</h3>
                  <h4><sup>₪</sup>2<span> / 3 שימושים</span></h4>
                  <ul>
                    <li>העלאת 3 צילומי מסך</li>
                    <li>קבלת תשובות באייאיי</li>
                    <li>משפטי פתיחה ללא הגבלה</li>
                    <li>תשובה חוזרת לאותה שיחה ללא הגבלה</li>
                    <li>שימוש על כל פלטפורמות ההיכרויות</li>
                  </ul>
                  <div className="btn-wrap">
                    <a href="#" className="btn-buy">אני רוצה</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mt-4 mt-lg-0">
                <div className="box" data-aos="zoom-in" data-aos-delay="400">
                  <span className="advanced">פופולרי</span>
                  <h3>10 שימושים</h3>
                  <h4><sup>₪</sup>4.5<span> / 10 שימושים</span></h4>
                  <ul>
                    <li>העלאת 10 צילומי מסך</li>
                    <li>קבלת תשובות באייאיי</li>
                    <li>משפטי פתיחה ללא הגבלה</li>
                    <li>תשובה חוזרת לאותה שיחה ללא הגבלה</li>
                    <li>שימוש על כל פלטפורמות ההיכרויות</li>
                  </ul>
                  <div className="btn-wrap">
                    <a href="#" className="btn-buy">אני רוצה</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="faq section-bg">
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>F.A.Q</h2>
              <p>שאלות ותשובות</p>
            </div>
            <div className="faq-list">
              <ul>
                <li data-aos="fade-up">
                  <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" className="collapse" data-bs-target="#faq-list-1">מדובר על מנוי המתחדש אוטומטית או מנוי חודשי? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                  <div id="faq-list-1" className="collapse show" data-bs-parent=".faq-list">
                    <p>
                      ממש לא. התשלום הינו עבור כמות השימושים שאותם תוכל לנצל בזמנך וכרצונך. אתה תחוייב רק על כמות השימושים שרכשת. אותם ניתן לרכוש באופן חד פעמי. הכמות אינה מתחדשת אוטומטית ויש לחדש אותה בעצמך. וככלל - אין תשלומים אוטומטיים או חודשיים בשירות שלנו :).
                    </p>
                  </div>
                </li>
                <li data-aos="fade-up" data-aos-delay="100">
                  <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-2" className="collapsed">למה הכוונה שימוש באייאיי ללא הגבלה? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                  <div id="faq-list-2" className="collapse" data-bs-parent=".faq-list">
                    <p>
                      העלאת תצלום מסך חדש ושליחתו למערכת, נחשבת בתור שימוש. אבל אם תלחץ על תגובה חדשה לאותה תמונה, תוכל לקבל תגובות חדשות מהמערכת אייאיי שלנו ללא הגבלה.
                    </p>
                  </div>
                </li>
                <li data-aos="fade-up" data-aos-delay="200">
                  <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-3" className="collapsed">האם ניתן לבטל כמות שימושים שרכשתי? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                  <div id="faq-list-3" className="collapse" data-bs-parent=".faq-list">
                    <p>
                      אנחנו מבטיחים לעשות כל שביכולתינו כדי לשמור על שביעות רצונך. ואנחנו כן נעשה החזר כספי במידת הצורך . ניתן לפנות אלינו בכתובת ״chat mates isaer"
                    </p>
                  </div>
                </li>
                <li data-aos="fade-up" data-aos-delay="300">
                  <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-4" className="collapsed">איך ניתן לדבר עם נציג? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                  <div id="faq-list-4" className="collapse" data-bs-parent=".faq-list">
                    <p>
                      ניתן לפנות אלינו בכל יום לכתובת המייל  : 345345345345
                    </p>
                  </div>
                </li>
                <li data-aos="fade-up" data-aos-delay="400">
                  <i className="bx bx-help-circle icon-help"></i> <a data-bs-toggle="collapse" data-bs-target="#faq-list-5" className="collapsed">Tortor vitae purus faucibus ornare. Varius vel pharetra vel turpis nunc eget lorem dolor? <i className="bx bx-chevron-down icon-show"></i><i className="bx bx-chevron-up icon-close"></i></a>
                  <div id="faq-list-5" className="collapse" data-bs-parent=".faq-list">
                    <p>
                      Laoreet sit amet cursus sit amet dictum sit amet justo. Mauris vitae ultricies leo integer malesuada nunc vel. Tincidunt eget nullam non nisi est sit amet. Turpis nunc eget lorem dolor sed. Ut venenatis tellus in metus vulputate eu scelerisque.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section id="contact" className="contact">
          <div className="container">
            <div className="section-title" data-aos="fade-up">
              <h2>Contact</h2>
              <p>Contact Us</p>
            </div>
            <div className="row">
              <div className="col-lg-4" data-aos="fade-right" data-aos-delay="100">
                <div className="info">
                  <div className="address">
                    <i className="bi bi-geo-alt"></i>
                    <h4>Location:</h4>
                    <p>A108 Adam Street, New York, NY 535022</p>
                  </div>
                  <div className="email">
                    <i className="bi bi-envelope"></i>
                    <h4>Email:</h4>
                    <p>info@example.com</p>
                  </div>
                  <div className="phone">
                    <i className="bi bi-phone"></i>
                    <h4>Call:</h4>
                    <p>+1 5589 55488 55s</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 mt-5 mt-lg-0" data-aos="fade-left" data-aos-delay="200">
                <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                  <div className="row">
                    <div className="col-md-6 form-group">
                      <input type="text" name="name" className="form-control" id="name" placeholder="Your Name" required />
                    </div>
                    <div className="col-md-6 form-group mt-3 mt-md-0">
                      <input type="email" className="form-control" name="email" id="email" placeholder="Your Email" required />
                    </div>
                  </div>
                  <div className="form-group mt-3">
                    <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                  </div>
                  <div className="form-group mt-3">
                    <textarea className="form-control" name="message" rows="5" placeholder="Message" required></textarea>
                  </div>
                  <div className="my-3">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">Your message has been sent. Thank you!</div>
                  </div>
                  <div className="text-center"><button type="submit">Send Message</button></div>
                </form>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="footer-info">
                  <h3>Bootslander</h3>
                  <p className="pb-3"><em>Qui repudiandae et eum dolores alias sed ea. Qui suscipit veniam excepturi quod.</em></p>
                  <p>
                    A108 Adam Street <br />
                    NY 535022, USA<br /><br />
                    <strong>Phone:</strong> +1 5589 55488 55<br />
                    <strong>Email:</strong> info@example.com<br />
                  </p>
                  <div className="social-links mt-3">
                    <a href="#" className="twitter"><i className="bx bxl-twitter"></i></a>
                    <a href="#" className="facebook"><i className="bx bxl-facebook"></i></a>
                    <a href="#" className="instagram"><i className="bx bxl-instagram"></i></a>
                    <a href="#" className="google-plus"><i className="bx bxl-skype"></i></a>
                    <a href="#" className="linkedin"><i className="bx bxl-linkedin"></i></a>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-6 footer-links">
                <h4>Useful Links</h4>
                <ul>
                  <li><i className="bx bx-chevron-right"></i> <a href="#">Home</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#">About us</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#">Services</a></li>
                  <li><i className="bx bx-chevron-right"></i> <Link to="/terms">Terms of service</Link></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6 footer-links">
                <h4>Our Services</h4>
                <ul>
                  <li><i className="bx bx-chevron-right"></i> <a href="#">Web Design</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#">Web Development</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#">Product Management</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#">Marketing</a></li>
                  <li><i className="bx bx-chevron-right"></i> <a href="#">Graphic Design</a></li>
                </ul>
              </div>
              
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            &copy; Copyright <strong><span>ChatMates</span></strong>. All Rights Reserved
          </div>
          <div className="credits">
          </div>
        </div>
      </footer>

      <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
      {/* <div id="preloader"></div> */}

      {/* <script src="assets/vendor/purecounter/purecounter_vanilla.js"></script>
  <script src="assets/vendor/aos/aos.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
  <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
  <script src="assets/vendor/php-email-form/validate.js"></script>
  <script src="assets/js/main.js"></script> */}


    </>
  );
}

export default MainPage;