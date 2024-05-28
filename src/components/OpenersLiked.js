// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useAuth0 } from "@auth0/auth0-react";
// import DialogModal from './Dialogs/DialogLogin'; // Import the DialogModal component
// import { Link } from 'react-router-dom';
// import brokenHeart from '../brokenheart.png';

// function OpenersLiked() {
//   const [likedOpeners, setLikedOpeners] = useState([]);
//   const { isAuthenticated, user } = useAuth0();
//   const [showAuthDialog, setShowAuthDialog] = useState(false); // State variable to manage whether the auth dialog is open

//   useEffect(() => {
//     const fetchLikedOpeners = async () => {
//       if (isAuthenticated) {
//         try {
//           const userEmail = user.email;
//           const response = await axios.get('https://web-production-dd6e3.up.railway.app/date/openers-liked', {
//             params: {
//               email: userEmail
//             }
//           });
//           setLikedOpeners(response.data);
//         } catch (error) {
//           console.error("Error fetching liked openers:", error);
//         }
//       } else {
//         setShowAuthDialog(true); // Open the auth dialog if user is not authenticated
//       }
//     };

//     fetchLikedOpeners();
//   }, [isAuthenticated, user]);

//   const deleteLikedOpener = async (openerToDelete) => {
//     try {
//       const userEmail = user.email;
//       // Send DELETE request to the server to delete the opener
//       await axios.delete('https://web-production-dd6e3.up.railway.app/date/openers-liked', {
//         params: {
//           email: userEmail,
//           opener: openerToDelete
//         }
//       }).then(() => {
//         // If the deletion request is successful, update the state to remove the deleted opener locally
//         setLikedOpeners(prevLikedOpeners => prevLikedOpeners.filter(opener => opener !== openerToDelete));
//       });
//     } catch (error) {
//       console.error('Error deleting liked opener:', error.message);
//     }
//   };

//   return (
//     <div className="custom-home-page">
//       <div className="hero">
//         <div className="circle"></div>
//         <div className="cool-move" style={{direction:'rtl'}}>
//           <h1>משפטי פתיחה</h1>
//           {showAuthDialog && (
//             <DialogModal
//               handleConfirm={() => setShowAuthDialog(false)}
//               handleCancel={() => setShowAuthDialog(false)}
//             />
//           )}
//           <ul>
//             {Array.isArray(likedOpeners) && likedOpeners.length > 0 ? (
//               likedOpeners.map((opener, index) => (
//                 <li key={index} style={{padding:'10px'}}>
//                   {opener}
//                   <button style={{marginRight:'10px'}} onClick={() => deleteLikedOpener(opener)}>מחק</button>
//                 </li>
//               ))
              
//             ) : (
//               <>
//                   <img src={brokenHeart} style={{boxShadow:'none'}} alt="brokenHeart" />
//                 <br></br>
//                 <div>
//                 אין לך עדיין משפטי פתיחה  <Link to="/openers">תוסיף</Link> משפטי פתיחה.</div>
              
//                </>
              
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OpenersLiked;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import DialogModal from './Dialogs/DialogLogin'; // Import the DialogModal component
import { Link } from 'react-router-dom';
import brokenHeart from '../brokenheart.png';

function OpenersLiked() {
  const [likedItems, setLikedItems] = useState([]);
  const [isText, setIsText] = useState(true); // State variable to determine if showing liked texts or openers
  const { isAuthenticated, user } = useAuth0();
  const [showAuthDialog, setShowAuthDialog] = useState(false); // State variable to manage whether the auth dialog is open

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          const userEmail = user.email;
          const endpoint = isText ? 'text-liked' : 'openers-liked'; // Determine endpoint based on isText state
          const response = await axios.get(`https://web-production-dd6e3.up.railway.app/date/${endpoint}`, {
            params: {
              email: userEmail
            }
          });
          setLikedItems(response.data);
        } catch (error) {
          console.error(`Error fetching liked ${isText ? 'texts' : 'openers'}:`, error);
        }
      } else {
        setShowAuthDialog(true); // Open the auth dialog if user is not authenticated
      }
    };

    fetchData();
  }, [isAuthenticated, user, isText]);

  const deleteLikedItem = async (itemToDelete) => {
    try {
      const userEmail = user.email;
      const endpoint = isText ? 'text-liked' : 'openers-liked'; // Determine endpoint based on isText state
      // Send DELETE request to the server to delete the item
      await axios.delete(`https://web-production-dd6e3.up.railway.app/date/${endpoint}`, {
        params: {
          email: userEmail,
          [isText ? 'text' : 'opener']: itemToDelete
        }
      }).then(() => {
        // If the deletion request is successful, update the state to remove the deleted item locally
        setLikedItems(prevLikedItems => prevLikedItems.filter(item => item !== itemToDelete));
      });
    } catch (error) {
      console.error(`Error deleting liked ${isText ? 'text' : 'opener'}:`, error.message);
    }
  };

  const toggleLikedType = () => {
    setIsText(!isText); // Toggle between liked texts and openers
  };

  return (
    <div className="custom-home-page">
      <div className="hero">
        <div className="circle"></div>
        <div className="cool-move" style={{direction:'rtl'}}>
          <h1>{isText ? 'טקסט שאהבת' : 'משפטי פתיחה'}</h1>
          {showAuthDialog && (
            <DialogModal
              handleConfirm={() => setShowAuthDialog(false)}
              handleCancel={() => setShowAuthDialog(false)}
            />
          )}
          <button onClick={toggleLikedType}>{isText ? 'Show Openers Liked' : 'Show Text Liked'}</button>
          <ul>
            {Array.isArray(likedItems) && likedItems.length > 0 ? (
              likedItems.map((item, index) => (
                <li key={index} style={{padding:'10px'}}>
                  {item}
                  <button style={{marginRight:'10px'}} onClick={() => deleteLikedItem(item)}>מחק</button>
                </li>
              ))
            ) : (
              <>
                <img src={brokenHeart} style={{boxShadow:'none'}} alt="brokenHeart" />
                <br></br>
                <div>
                  {isText ? 
                    'אין לך עדיין משפטי פתיחה' :
                    'No texts liked. Please add a text.'
                  }
                  <Link to={isText ? "/openers" : "/"}>{isText ? 'תוסיף' : 'Add'}</Link> {isText ? 'משפטי פתיחה' : 'a text'}
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OpenersLiked;
