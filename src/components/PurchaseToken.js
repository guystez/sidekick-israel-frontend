// import React, { useState } from 'react';
// import axios from 'axios';
// import { useAuth0 } from "@auth0/auth0-react";
// import "primeflex/primeflex.css";
// // import { StyleClass } from 'primereact/styleclass';
// import { Button } from '@mui/material';
// import Trophy from '../wreath.png';


// const PurchaseToken = () => {
//     const [duration, setDuration] = useState('');
//     const { isAuthenticated, user } = useAuth0();

//     const handlePurchase = async (duration) => {
//         if (isAuthenticated) {
//             try {
//                 const response = await axios.post('https://web-production-dd6e3.up.railway.app/date/purchase-token', {
//                     email: user.email,
//                     duration: duration
//                 });
//                 alert(response.data.status);
//             } catch (error) {
//                 console.error(error);
//                 alert('Failed to purchase token');
//             }
//         } else {
//             alert('You need to be authenticated to purchase a token');
//         }
//     };

    
//     return (

//         <div className="custom-home-page">

//             <div className="hero" style={{ direction: 'rtl' }}>
//                 <div className="circle"></div>
//                 <div className="cool-move">
//                     <div className="surface-0">
//                         <div className="text-900 font-bold text-6xl mb-4 text-center">המחירים שלנו</div>
//                         <div className="text-700 text-xl mb-6 text-center line-height-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit numquam eligendi quos.</div>
                        
//                         <div className="grid">
//                             <div className="col-12 lg:col-4">
//                                 <div className="p-3 h-full">
//                                     <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px', backgroundColor: 'white', backgroundColor: 'white' }}>
//                                         <div className="text-900 font-medium text-xl mb-2" style={{ backgroundColor: '#0de2ab', borderRadius: '10px' }}>
//                                             <div style={{ fontSize: 'xx-large' }}>
//                                                 סקרן
//                                             </div>
//                                             <div className="text-600" >3 ימים</div></div>
//                                         <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
//                                         <div className="flex align-items-center">
//                                             <span className="font-bold text-2xl text-900" style={{ fontFamily: 'none' }}>
//                                                 ₪9
//                                                 <br></br>
//                                                 <div style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 'medium' }}>
//                                                     תשלום חד פעמי ל3 ימים לא מתחדש אוטומטי
//                                                 </div>
//                                             </span>
//                                             <span className="ml-2 font-medium text-600"></span>
//                                         </div>
//                                         <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
//                                         <ul className="list-none p-0 m-0 flex-grow-1">
//                                             <li className="flex align-items-center mb-3">
//                                                 <i className="pi pi-check-circle text-green-500 mr-2"></i>
//                                                 <span>לסקרנים שמחפשים לגלות את העולם של הפלירטוט האוטומטי בלי התחייבות ארוכה. כי לפעמים כדאי לבדוק את המים לפני שקופצים!</span>
//                                             </li>
//                                             <li className="flex align-items-center mb-3">
//                                                 <i className="pi pi-check-circle text-green-500 mr-2"></i>
//                                                 <span>- תשובות לשיחות מותאמות אישית בעזרת - AI
//                                                 </span>
//                                             </li>
//                                             <li className="flex align-items-center mb-3">
//                                                 <i className="pi pi-check-circle text-green-500 mr-2"></i>
//                                                 <span>- מאגר משפטי פתיחה יצירתיים לכל סיטואציה אפשרית
//                                                 </span>
//                                             </li>
//                                             <li className="flex align-items-center mb-3">
//                                                 <i className="pi pi-check-circle text-green-500 mr-2"></i>
//                                                 <span>- שמירה ללא הגבלה של תשובות ומועדפים
//                                                 </span>
//                                             </li>
//                                         </ul>
//                                         <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
//                                         <Button label="Buy Now" className="p-3 w-full mt-auto" style={{ backgroundColor: '#6366F1' }} onClick={() => handlePurchase(3)}>
//                                             <div style={{ color: 'white', fontSize: 'x-large' }}> קנה עכשיו</div>
//                                         </Button>

//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="col-12 lg:col-4">

//                                 <div className="p-3 h-full">

//                                     <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px', backgroundColor: 'white' }}>

//                                         <div className="text-900 font-medium text-xl mb-2" style={{ backgroundColor: '#0de2ab', borderRadius: '10px' }}>
//                                             <div style={{ fontSize: 'xx-large', marginLeft: '20px' }}>
//                                                 <img src={Trophy} style={{ boxShadow: 'none', width: '10%' }} alt="Trophy" />
//                                                 אלוף
//                                             </div>
//                                             <div className="text-600">7 ימים</div>
//                                         </div>
//                                     <span className="advanced2">הנמכר ביותר</span>

//                                         <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
//                                         <div className="flex align-items-center">
//                                             <span className="font-bold text-2xl text-900" style={{ fontFamily: 'none' }}>

//                                                 ₪9
//                                                 <br></br>
//                                                 <div style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 'medium' }}>
//                                                     תשלום חד פעמי ל7 ימים לא מתחדש אוטומטי
//                                                 </div>

//                                             </span>

//                                             <span className="ml-2 font-medium text-600" > </span>
//                                         </div>
//                                         <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
//                                         <ul className="list-none p-0 m-0 flex-grow-1">
//                                             <li className="flex align-items-center mb-3">
//                                                 <i className="pi pi-check-circle text-green-500 mr-2"></i>
//                                                 <span>לאלופים שמחפשים שבוע של הצלחות רומנטיות מהירות. למה להתאמץ כשאפשר להיות אלוף בקלות?
//                                                 </span>
//                                             </li>
//                                             <li className="flex align-items-center mb-3">
//                                                 <i className="pi pi-check-circle text-green-500 mr-2"></i>
//                                                 <span>- תשובות לשיחות מותאמות אישית בעזרת - AI
//                                                 </span>
//                                             </li>
//                                             <li className="flex align-items-center mb-3">
//                                                 <i className="pi pi-check-circle text-green-500 mr-2"></i>
//                                                 <span>- מאגר משפטי פתיחה יצירתיים לכל סיטואציה אפשרית
//                                                 </span>
//                                             </li>
//                                             <li className="flex align-items-center mb-3">
//                                                 <i className="pi pi-check-circle text-green-500 mr-2"></i>
//                                                 <span>- שמירה ללא הגבלה של תשובות ומועדפים
//                                                 </span>
//                                             </li>
//                                         </ul>
//                                         <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
//                                         <Button label="Buy Now" className="p-3 w-full" style={{ backgroundColor: '#6366F1' }} onClick={() => handlePurchase(7)}>
//                                             <div style={{ color: 'white', fontSize: 'x-large' }}> קנה עכשיו</div>
//                                         </Button>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="col-12 lg:col-4">
//                                 <div className="p-3 h-full">
//                                     <div className="shadow-2 p-3 flex flex-column" style={{ borderRadius: '6px', backgroundColor: 'white' ,height: '100%'}}>

//                                         <div className="text-900 font-medium text-xl mb-2" style={{ backgroundColor: '#0de2ab', borderRadius: '10px' }}>
//                                             <div style={{ fontSize: 'xx-large' }}>
//                                                 מאסטר
//                                             </div>
//                                             <div className="text-600">30 ימים</div></div>
//                                         <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />

//                                         <div className="flex align-items-center">
//                                             <span className="font-bold text-2xl text-900" style={{ fontFamily: 'none' }}>
//                                                 ₪49
//                                                 <br></br>
//                                                 <div style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 'medium' }}>
//                                                     תשלום חד פעמי ל30 ימים לא מתחדש אוטומטי
//                                                 </div>
//                                             </span>
//                                             <span className="ml-2 font-medium text-600"></span>

//                                         </div>
//                                         <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
//                                         <ul className="list-none p-0 m-0 flex-grow-1">
//                                             <li className="flex align-items-center mb-3">
//                                                 <i className="pi pi-check-circle text-green-500 mr-2"></i>
//                                                 <span>למאסטרים של הפלירטוט, אלו שמכירים את המשחק ורוצים להקל על עצמם עם כלי אוטומטי
//                                                 </span>
//                                             </li>
//                                             <li className="flex align-items-center mb-3">
//                                                 <i className="pi pi-check-circle text-green-500 mr-2"></i>
//                                                 <span>- תשובות לשיחות מותאמות אישית בעזרת - AI
//                                                 </span>
//                                             </li>
//                                             <li className="flex align-items-center mb-3">
//                                                 <i className="pi pi-check-circle text-green-500 mr-2"></i>
//                                                 <span>- מאגר משפטי פתיחה יצירתיים לכל סיטואציה אפשרית
//                                                 </span>
//                                             </li>
//                                             <li className="flex align-items-center mb-3">
//                                                 <i className="pi pi-check-circle text-green-500 mr-2"></i>
//                                                 <span>- שמירה ללא הגבלה של תשובות ומועדפים
//                                                 </span>
//                                             </li>
//                                             <li className="flex align-items-center mb-3">
//                                                 <i className="pi pi-check-circle text-green-500 mr-2"></i>
//                                                 <span>-גישה מוקדמת לפיצ'רים הכי חדשים ומתקדמים לפני כולם
//                                                 </span>
//                                             </li>
//                                         </ul>
//                                         <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
//                                         <Button label="Buy Now" className="p-3 w-full p-button-outlined" style={{ backgroundColor: '#6366F1' }} onClick={() => handlePurchase(30)}>
//                                             <div style={{ color: 'white', fontSize: 'x-large' }}> קנה עכשיו</div>
//                                         </Button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PurchaseToken;


















import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import "primeflex/primeflex.css";
import { Button } from '@mui/material';
import Trophy from '../wreath.png';

const PurchaseToken = () => {
    const { isAuthenticated, user } = useAuth0();
    const [paymentStatus, setPaymentStatus] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const responseCode = queryParams.get('responseCode');
        console.log("responseCode: ",responseCode);
        if (responseCode) {
            console.log('responseCode: ',responseCode);
            if (responseCode === '1') {
                setPaymentStatus('success');
                // Handle successful payment
                alert('Payment successful!');
            } else {
                setPaymentStatus('failure');
                // Handle failed payment
                alert('Payment failed. Please try again.');
            }

            // Clear the URL parameters
            window.history.replaceState({}, document.title, "/PurchaseToken");
        }
    }, [location]);
    const handlePurchase = async (duration) => {
        try {
            // Determine the order total sum based on the selected duration
            let orderTotalSum;
            if (duration === 3) {
                orderTotalSum = 15;
            } else if (duration === 7) {
                orderTotalSum = 28;
            } else if (duration === 30) {
                orderTotalSum = 49;
            }

            // Set up the order data object with necessary parameters
            const orderData = {
                order_reference: 'some-order-reference', // Replace with actual order reference
                IPNAddress: "https://yourdomain.com/ipn-listener", // Replace with your IPN URL
                DisplayType: "redirect",
                CancelReturnAddress: "https://yourdomain.com/cancelorder?ordeid=1da23a",
                RedirectAddress: "http://localhost:3000/PurchaseToken", // Handle success or failure here
                CustomerFullName: user.name, // Use user's name from Auth0
                CustomerPhoneNumber: '1234567890', // Replace with actual phone number if available
                DealType: 1, // Assuming a regular deal type
                OrderTotalSum: orderTotalSum, // Prices based on duration
                Currency: "ILS",
            };

            // Define the headers with API keys
            const headers = {
                'Content-Type': 'application/json',
                'API_Secret': '488447db-0503-4fc8-9ed0-4e1d62ee0114',
                'API_Key': '95ed9b8d-8702-4c54-9dd8-b9242c7e3427',
            };

            // Send the order data to get the unique ID
            const response = await axios.post(
                'https://api.takbull.co.il/api/ExtranalAPI/GetTakbullPaymentPageRedirectUrl',
                orderData,
                { headers }
            );

            // Get the unique ID from the response
            const uniqId = response.data.uniqId;

            // Redirect the user to the payment page using the unique ID
            window.location.href = `https://api.takbull.co.il/PaymentGateway?orderUniqId=${uniqId}`;
        } catch (error) {
            // Handle any errors that occur during the process
            console.error('Error occurred during purchase:', error);
        }
    };


    return (
        <div className="custom-home-page">
            <div className="hero" style={{ direction: 'rtl' }}>
                <div className="circle"></div>
                <div className="cool-move">
                    <div className="surface-0">
                        <div className="text-900 font-bold text-6xl mb-4 text-center">המחירים שלנו</div>
                        <div className="text-700 text-xl mb-6 text-center line-height-3">
                        דייטים מוצלחים הם במרחק קליק אחד

                        </div>
                        
                        <div className="grid">
                            <div className="col-12 lg:col-4">
                                <div className="p-3 h-full">
                                    <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px', backgroundColor: 'white', backgroundColor: 'white' }}>
                                        <div className="text-900 font-medium text-xl mb-2" style={{ backgroundColor: '#0de2ab', borderRadius: '10px' }}>
                                            <div style={{ fontSize: 'xx-large' }}>
                                                סקרן
                                            </div>
                                            <div className="text-600" >3 ימים</div></div>
                                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                        <div className="flex align-items-center">
                                            <span className="font-bold text-2xl text-900" style={{ fontFamily: 'none' }}>
                                                ₪15
                                                <br></br>
                                                <div style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 'medium' }}>
                                                    תשלום חד פעמי ל3 ימים לא מתחדש אוטומטי
                                                </div>
                                            </span>
                                            <span className="ml-2 font-medium text-600"></span>
                                        </div>
                                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                        <ul className="list-none p-0 m-0 flex-grow-1">
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                <span>לסקרנים שמחפשים לגלות את העולם של הפלירטוט האוטומטי בלי התחייבות ארוכה. כי לפעמים כדאי לבדוק את המים לפני שקופצים!</span>
                                            </li>
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                <span>- תשובות לשיחות מותאמות אישית בעזרת - AI
                                                </span>
                                            </li>
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                <span>- מאגר משפטי פתיחה יצירתיים לכל סיטואציה אפשרית
                                                </span>
                                            </li>
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                <span>- שמירה ללא הגבלה של תשובות ומועדפים
                                                </span>
                                            </li>
                                        </ul>
                                        <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
                                        <Button label="Buy Now" className="p-3 w-full mt-auto" style={{ backgroundColor: '#6366F1' }} onClick={() => handlePurchase(3)}>
                                            <div style={{ color: 'white', fontSize: 'x-large' }}> קנה עכשיו</div>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 lg:col-4">
                                <div className="p-3 h-full">
                                    <div className="shadow-2 p-3 h-full flex flex-column" style={{ borderRadius: '6px', backgroundColor: 'white' }}>
                                        <div className="text-900 font-medium text-xl mb-2" style={{ backgroundColor: '#0de2ab', borderRadius: '10px' }}>
                                            <div style={{ fontSize: 'xx-large', marginLeft: '20px' }}>
                                                <img src={Trophy} style={{ boxShadow: 'none', width: '10%' }} alt="Trophy" />
                                                אלוף
                                            </div>
                                            <div className="text-600">7 ימים</div>
                                        </div>
                                        <span className="advanced2">הנמכר ביותר</span>

                                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                        <div className="flex align-items-center">
                                            <span className="font-bold text-2xl text-900" style={{ fontFamily: 'none' }}>
                                                ₪28
                                                <br></br>
                                                <div style={{ fontFamily: "'Helvetica Neue', sans-serif'", fontSize: 'medium' }}>
                                                    תשלום חד פעמי ל7 ימים לא מתחדש אוטומטי
                                                </div>
                                            </span>
                                            <span className="ml-2 font-medium text-600"></span>
                                        </div>
                                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                        <ul className="list-none p-0 m-0 flex-grow-1">
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                <span>לאלופים שמחפשים שבוע של הצלחות רומנטיות מהירות. למה להתאמץ כשאפשר להיות אלוף בקלות?
                                                </span>
                                            </li>
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                <span>- תשובות לשיחות מותאמות אישית בעזרת - AI
                                                </span>
                                            </li>
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                <span>- מאגר משפטי פתיחה יצירתיים לכל סיטואציה אפשרית
                                                </span>
                                            </li>
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                <span>- שמירה ללא הגבלה של תשובות ומועדפים
                                                </span>
                                            </li>
                                        </ul>
                                        <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                                        <Button label="Buy Now" className="p-3 w-full" style={{ backgroundColor: '#6366F1' }} onClick={() => handlePurchase(7)}>
                                            <div style={{ color: 'white', fontSize: 'x-large' }}> קנה עכשיו</div>
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 lg:col-4">
                                <div className="p-3 h-full">
                                    <div className="shadow-2 p-3 flex flex-column" style={{ borderRadius: '6px', backgroundColor: 'white', height: '100%' }}>
                                        <div className="text-900 font-medium text-xl mb-2" style={{ backgroundColor: '#0de2ab', borderRadius: '10px' }}>
                                            <div style={{ fontSize: 'xx-large' }}>
                                                מאסטר
                                            </div>
                                            <div className="text-600">30 ימים</div>
                                        </div>
                                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                        <div className="flex align-items-center">
                                            <span className="font-bold text-2xl text-900" style={{ fontFamily: 'none' }}>
                                                ₪49
                                                <br></br>
                                                <div style={{ fontFamily: "'Helvetica Neue', sans-serif", fontSize: 'medium' }}>
                                                    תשלום חד פעמי ל30 ימים לא מתחדש אוטומטי
                                                </div>
                                            </span>
                                            <span className="ml-2 font-medium text-600"></span>
                                        </div>
                                        <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                                        <ul className="list-none p-0 m-0 flex-grow-1">
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                <span>למאסטרים של הפלירטוט, אלו שמכירים את המשחק ורוצים להקל על עצמם עם כלי אוטומטי
                                                </span>
                                            </li>
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                <span>- תשובות לשיחות מותאמות אישית בעזרת - AI
                                                </span>
                                            </li>
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                <span>- מאגר משפטי פתיחה יצירתיים לכל סיטואציה אפשרית
                                                </span>
                                            </li>
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                <span>- שמירה ללא הגבלה של תשובות ומועדפים
                                                </span>
                                            </li>
                                            <li className="flex align-items-center mb-3">
                                                <i className="pi pi-check-circle text-green-500 mr-2"></i>
                                                <span>-גישה מוקדמת לפיצ'רים הכי חדשים ומתקדמים לפני כולם
                                                </span>
                                            </li>
                                        </ul>
                                        <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300" />
                                        <Button label="Buy Now" className="p-3 w-full p-button-outlined" style={{ backgroundColor: '#6366F1' }} onClick={() => handlePurchase(30)}>
                                            <div style={{ color: 'white', fontSize: 'x-large' }}> קנה עכשיו</div>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseToken;


