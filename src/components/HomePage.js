import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import UploadFile from "./UploadFile";
import LoadingButtonsTransition from "./Loader";
import ActionAlerts from "./Alert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DialogModal from "./Dialogs/DialogLogin"; // Import the DialogModal component
import DiscreteSliderValues from "./Slider";
import { Link, useNavigate } from "react-router-dom";
import { LikeButton } from "./LikeButton";
import PopUpDialog from "./Dialogs/PopUpDialog";
import { Button } from "@mui/material";
import ButtonSizes from "./Button";
import coin from "../coin.png";
import ChatSelector from "./ChatSelector";
import AddToHomeScreenPrompt from "./Shortcut";
import ChooseLanguage from "./ChooseLanguage";
import Tips from "./Tips";
import HeartSpinner from "./SpinnerHeart/HeartSpinner";
import SimpleAlert from "./AlertMui";

function HomePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [responseFromServer, setResponseFromServer] = useState("");
  const [responseFromGPT, setResponseFromGPT] = useState("");
  const [generatedResponse, setGeneratedResponse] = useState("");
  const [responseReceived, setResponseReceived] = useState(false);
  const [responses, setResponses] = useState([]);
  const { isAuthenticated, user, isLoading ,loginWithRedirect} = useAuth0();
  const [loading, setLoading] = useState(false);
  const [showUploadAlert, setShowUploadAlert] = useState(false); // State variable to control the visibility of the upload alert
  const [buttonVisible, setButtonVisible] = useState(true); // New state variable to track button visibility
  const [showAuthDialog, setShowAuthDialog] = useState(false); // State variable to manage whether the auth dialog is open
  const [sliderValue, setSliderValue] = useState(50); // State to store slider value
  const [countGenerateResponse, setCountGenerateResponse] = useState(0); // State to store slider value
  const [requestLeft, setRequestLeft] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false); // State variable to track whether the terms have been accepted
  const navigate = useNavigate();
  const [mockLike, setMockLike] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State variable to control popup dialog visibility
  const [feedBackPopup, setFeedBackPopup] = useState(false); // State variable to control popup dialog visibility
  const [noRequestsAlertShown, setNoRequestsAlertShown] = useState(false);
  const [loadingLocalStorage, setLoadingLocalStorage] = useState(true); // State to track local storage loading
  const [checkLanguage, setCheckLanguage] = useState(false); // State to track local storage loading
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSideMessages, setUserSideMessages] = useState(false); // State to track local storage loading
  const fileInputRef = useRef(null);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

 
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);



  useEffect(() => {
    if (isFlashing) {
      const timer = setTimeout(() => {
        setIsFlashing(false); // Stop flashing after 5 seconds
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isFlashing]);

  const handleImageChange = (e) => {
    if (!isAuthenticated) {
      console.log("User is not authenticated. Opening auth dialog...");
      setShowAuthDialog(true); // Open the auth dialog if user is not authenticated
      return;
    }

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
      setButtonVisible(true); // Set the button visible after the response is received
      setResponseReceived(false);
      setGeneratedResponse(""); // Reset generatedResponse
      setResponseFromServer(""); // Reset responseFromServer
      // setShowImageSelector(false);
      setIsFlashing(true); // Start flashing the button

      console.log("Image changed");
    }
  };

  // const handleImageChange = (e) => {
  //   if (e && e.target && e.target.files && e.target.files[0]) {
  //     const file = e.target.files[0];
  //     setSelectedImage(URL.createObjectURL(file));
  //     setShowImageSelector(false);
  //   }
  // };

  const triggerImageChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error("fileInputRef is not initialized.");
    }
  };

  const copyToClipboard = () => {
    const textToCopy = generatedResponse || responseFromServer; // Use generatedResponse first, then fallback to responseFromServer
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        setAlertMessage("הועתק");
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  const sendTextLiked = () => {
    const textToLike = generatedResponse || responseFromServer; // Use generatedResponse first, then fallback to responseFromServer
    if (isAuthenticated) {
      const userEmail = user.email;
      const url = "https://web-production-dd6e3.up.railway.app/date/text-liked";

      if (mockLike) {
        // If the text is already liked, send a DELETE request to unlike it
        axios
          .delete(url, { params: { email: userEmail, text: textToLike } })
          .then((response) => {
            if (response.status === 200) {
              console.log("Text unliked successfully:", response.data);
              // alert('נמחק')

              setMockLike(false);
            } else {
              console.error("Unexpected response status:", response.status);
              alert("Unexpected response status: " + response.status); // Show alert for unexpected response status
            }
          })
          .catch((error) => {
            console.error("Error unliking text:", error);
            alert("בעיה בשליחת אימייל"); // Show alert if there's an error
          });
      } else {
        setMockLike(true);
        // If the text is not liked, send a POST request to like it
        axios
          .post(url, { email: userEmail, text: textToLike })
          .then((response) => {
            if (response.status === 200) {
              console.log("Text liked successfully:", response.data);
              // alert('נשמר במועדפים')
            } else {
              if (response.status === 409) {
                console.log("Text already liked by the user:", response.data);
                // alert("כבר אהבת את זה"); // Show alert if text is already liked by the user
              } else {
                console.error("Unexpected response status:", response.status);
                alert("Unexpected response status: " + response.status); // Show alert for unexpected response status
              }
            }
          })
          .catch((error) => {
            if (error.response && error.response.status === 303) {
              console.error("Request failed with status code 303");
            } else {
              console.error("Error liking text:", error);
              alert("בעיה בשליחת אימייל"); // Show alert if there's an error
            }
          });
      }
    } else {
      console.error("User is not authenticated");
      alert("לא מחובר!"); // Show alert if user is not authenticated
    }
  };

  // Define the main function to make the request
  const makeRequest = async (formData, retryCount = 0) => {
    try {
      // Send the main request with the IP address in the headers
      const response = await axios.post(
        "https://web-production-dd6e3.up.railway.app/date/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Resetting the generated response
      setGeneratedResponse("");

      // Check if the request was successful
      if (response.status === 200) {
        // If the final_answer is undefined, retry the request
        if (response.data.final_answer === undefined) {
          if (retryCount < 5) {
            console.log("final_answer is undefined, retrying request...");
            makeRequest(formData, retryCount + 1);
          } else {
            console.log("Request failed after 5 retries");
            alert("משהו השתשבש אנא נסה שוב");
            setLoading(false);
          }
        } else {
          // Set state with the received response data
          setResponseFromServer(response.data.final_answer);
          setResponses((prevResponses) => [
            ...prevResponses,
            { type: "server", value: response.data.final_answer },
          ]);
          setCurrentIndex(responses.length);
          console.log(response.data.final_answer, "@@@@@@@@@");
          setRequestLeft(response.data.request_left);
          setResponseFromGPT(JSON.stringify(response.data.answer1));
          console.log(response.data.answer1, "!!!!!");
          setResponseReceived(true);
          setLoading(false);
          setButtonVisible(false);
          setCountGenerateResponse(100);
        }
      } else {
        // If the response status is not 200, retry the request
        if (retryCount < 5) {
          console.log("Retrying request...");
          makeRequest(formData, retryCount + 1);
        } else {
          alert("משהו השתשבש אנא נסה שוב");
          setLoading(false);
          console.log("Request failed after 5 retries");
        }
      }
    } catch (error) {
      console.error("Error sending image to server:", error);

      // Handling different error cases
      if (
        error.response &&
        error.response.status === 404 &&
        error.response.data.error === "No requests left"
      ) {
        alert("לא נשארו עוד טוקנים");
        setLoading(false);
        setNoRequestsAlertShown(true);
      } else if (
        error.response &&
        error.response.status === 404 &&
        error.response.data.error === "Upload screenshot without KeyBoard"
      ) {
        alert("העלה תמונה ללא מקלדת");
        setLoading(false);
      } else {
        if (retryCount < 5) {
          console.log("Retrying request...");
          makeRequest(formData, retryCount + 1);
        } else {
          console.log("Request failed after 5 retries");
          alert("משהו השתשבש אנא נסה שוב");
          setLoading(false);
        }
      }
    }
  };

  // const handleFeedbackClick = () => {
  //   setFeedBackPopup(true); // Set state to show the feedback dialog
  // };

  const handleSendImage = async () => {
    if (!isAuthenticated) {
      console.log("User is not authenticated. Opening auth dialog...");
      setShowAuthDialog(true);
      return;
    }
    if (!imageFile) {
      console.log("No image file selected, showing upload alert...");
      setShowUploadAlert(true);
      setTimeout(() => {
        setShowUploadAlert(false);
      }, 3000);
      return;
    } else {
      const image = new Image();
      image.src = URL.createObjectURL(imageFile);
      image.onload = () => {
        if (image.width < 500) {
          alert("נא לעלות תמונה בגודל רגיל");
        } else if (checkLanguage) {
          alert("בחר צד בתמונה");
        } else {
          setLoading(true);
          const formData = new FormData();
          formData.append("image", imageFile);
          formData.append("email", user.email);

          makeRequest(formData);
        }
      };
    }
  };

  useEffect(() => {
    console.log("Selected image changed:", selectedImage);

    setShowUploadAlert(false); // Hide the upload alert when the component re-renders
  }, [selectedImage]); // Triggered whenever selectedImage changes

  const handleGenerateResponse = () => {
    if (isAuthenticated) {
      setLoading(true);
      const makeRequest = () => {
        axios
          .post("https://web-production-dd6e3.up.railway.app/date/generate", {
            request: responseFromGPT,
            chatgpt: generatedResponse || responseFromServer,
            mode: { sliderValue },
            email: user.email,
          })
          .then((response) => {
            setGeneratedResponse(response.data);
            setResponses((prevResponses) => [
              ...prevResponses,
              { type: "generated", value: response.data },
            ]);
            setCurrentIndex(responses.length);
            if (response.status === 200) {
              setLoading(false);
              setMockLike(false);
              setCountGenerateResponse((prevCount) => prevCount - 1); // Decrease countGenerateResponse by 1

              console.log(countGenerateResponse, "@@@@@@@@@@@@@@@@@@@@@@@@");
            } else {
              console.log("Retrying request...");
              makeRequest();
            }
          })
          .catch((error) => {
            console.error("Error sending:", error);
            console.log("Retrying request...");
            makeRequest();
          });
      };

      makeRequest();
    } else {
      console.error("User is not authenticated");
    }
  };

  // Inside the useEffect hook where userAnswer is set
  useEffect(() => {
    const checkUserAnswer = async () => {
      
      if (isAuthenticated && user) {
        setIsPageLoading(false)
        // Check if user is authenticated and user object is not undefined
        try {
          const response = await axios.get(
            "https://web-production-dd6e3.up.railway.app/date/check-hebrew",
            {
              params: {
                email: user.email, // Access user.email only if user is not undefined
              },
            }
          );

          console.log("API response:", response.data);

          setRequestLeft(response.data.request_left);
          setIsPageLoading(false);
          if (response.data.check_terms == null) {
            console.log(
              "Navigating to FirstTimePage because check_terms is null"
            );
            navigate("/FirstTime");
          } else {
            console.log("Setting termsAccepted to true");
            setTermsAccepted(true);
          }

          if (response.data.is_hebrew == null) {
            console.log(
              "Setting checkLanguage to true because is_hebrew is null"
            );
            setCheckLanguage(true);
          } else {
            if (response.data.is_hebrew == "right") {
              setUserSideMessages(true);
            } else {
              setUserSideMessages(false);
            }
            console.log("is_hebrew is not null");
          }

          // if (response.data.check_feedback === '') {
          //   console.log('Setting feedBackPopup to true because check_feedback is empty');
          //   setFeedBackPopup(true);
          // }

          if (response.data.check_gifts === false) {
            console.log(
              "Setting showPopup to true because check_gifts is false and setting requestLeft to 5"
            );
            setShowPopup(true);
            setRequestLeft(5);
          }
        } catch (error) {
          if (
            error.response &&
            error.response.status === 404 &&
            error.response.data.error === "User does not mark the question"
          ) {
            console.error("User does not mark the question");
          } else {
            console.error("Error checking user answer:", error);
            navigate("/FirstTime");
          }
        }
      }
    };

    checkUserAnswer();
  }, [isAuthenticated, user]); // Include isAuthenticated and user in the dependency array

  useEffect(() => {
    if (responseFromServer || generatedResponse) {
      const heroElement = document.querySelector(".hero");
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  }, [responseFromServer, generatedResponse]);

  useEffect(() => {
    // Check if user object is available and not loading
    if (user && !isLoading) {
      console.log("User:"); // Log the user object
    } else {
      // Set a timeout to change setShowAuthDialog to true after 0.5 seconds
      const timeoutId = setTimeout(() => {
        setShowAuthDialog(true);
      }, 100);
  
      // Cleanup function to clear the timeout if dependencies change
      return () => clearTimeout(timeoutId);
    }
  }, [user, isLoading]);

  useEffect(() => {
    if (window.location.href.includes("verify")) {
      // Show alert for verification required
      alert("קיבלת קוד אימות אנא אשר באימייל שלך");
      loginWithRedirect()
      // setShowAuthDialog(true);
    }
    if (isAuthenticated) {
      setShowAuthDialog(false);
    }
  }, [isAuthenticated]);

  const handleSliderChange = (value) => {
    setSliderValue(value); // Update slider value state
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      // const termsAccepted = localStorage.getItem('termsAccepted');

      // Check if user is logged in
      if (isLoggedIn) {
        // Optionally set terms accepted state here
      }

      // Set loading state to false after checking local storage
      setLoadingLocalStorage(false);
    };

    checkLoginStatus(); // Check login status when component mounts
  }, []);

  console.log(
    "responseFromServer:",
    responseFromServer,
    "Request left : ",
    requestLeft
  );

  const handleOpenDialog = () => {
    setShowAuthDialog(true);
  };

  const handleCloseDialog = () => {
    setShowAuthDialog(false);
  };

  const handleOpenFeedback = () => {
    setFeedBackPopup(true);
  };

  const handleLanguageCheck = () => {
    setCheckLanguage(false);
    console.log("checkLanguage: ", checkLanguage);
  };

  const handleLanguageSelection = (selectedSide) => {
    const updatedUserSideMessages = selectedSide === "right";
    setUserSideMessages(updatedUserSideMessages);
  };

  useEffect(() => {
    console.log("userSideMessages:", userSideMessages);
  }, [userSideMessages]);

  return (
    <div className="custom-home-page">
      <div className="hero">
        <div className="circle"></div>
        <div className="cool-move">
          {isPageLoading ? (
            <HeartSpinner />
          ) : (
            <>
              {!loadingLocalStorage && !isLoading && !isAuthenticated && (
                <div className="journey-message">
                  <button
                    style={{ padding: "10px" }}
                    onClick={handleOpenDialog}
                  >
                    בוא נתחיל
                  </button>
                </div>
              )}

              {isAuthenticated && termsAccepted && requestLeft !== 0 && (
                <>
                  {/* <p style={{ direction: "rtl" }}>
                    {requestLeft} <img src={coin} style={{ width: "20px" }} />{" "}
                    נשארו
                  </p> */}
                  <div className={isFlashing ? "flashing" : ""}>
                    <Tips />
                    <div></div>
                    {showPopup && (
                      <PopUpDialog
                        handleCancel={() => setShowAuthDialog(false)}
                      />
                    )}{" "}
                    {/* Render the popup dialog if showPopup is true */}
                  </div>
                </>
              )}

              {(requestLeft === 0 || noRequestsAlertShown) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => alert("Please buy more requests")}
                >
                  נגמרו כל הבקשות אנא קנו עוד
                </Button>
              )}
              {isAuthenticated && termsAccepted && (
                <>
                  <UploadFile
                    onChange={handleImageChange}
                    fileInputRef={fileInputRef}
                  />
                  {selectedImage ? (
                    <div
                      style={{
                        border: "2px dashed #ccc",
                        padding: "10px",
                        borderRadius: "10px",
                      }}
                    >
                      <img
                        src={selectedImage}
                        alt="Uploaded"
                        style={{ maxWidth: "300px", maxHeight: "350px" }}
                      />
                      <ChooseLanguage userSideMessages={userSideMessages} />
                      {checkLanguage && (
                        <ChatSelector
                          selectedImage={selectedImage}
                          onSend={() => {}}
                          onChangeImage={triggerImageChange}
                          onLanguageCheck={handleLanguageCheck} // Pass isOpen prop indicating whether the ChatSelector is open
                          onLanguageSelection={handleLanguageSelection} // Pass the callback function
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      style={{
                        border: "2px dashed #ccc",
                        padding: "10px",
                        borderRadius: "10px",
                      }}
                    >
                      אין עדיין תמונה
                    </div>
                  )}
                </>
              )}

              {buttonVisible && selectedImage && (
                <LoadingButtonsTransition
                  onClick={handleSendImage}
                  loading={loading}
                  buttonLabel="שלח"
                />
              )}
              {alertMessage && <SimpleAlert message={alertMessage} />}
              <ActionAlerts showAlert={showUploadAlert} />
              {responses.length > 0 && (
                <div className="response-container">
                  {responses.length > 1 && (
                    <div>
                      <button
                        disabled={currentIndex === 0}
                        onClick={() => setCurrentIndex(currentIndex - 1)}
                      >
                        חזור
                      </button>
                      <button
                        disabled={currentIndex === responses.length - 1}
                        onClick={() => setCurrentIndex(currentIndex + 1)}
                      >
                        הבא
                      </button>
                    </div>
                  )}
                  <div style={{ marginTop: "30px" }}>
                    <button
                      className="copy-button"
                      onClick={() =>
                        copyToClipboard(responses[currentIndex].value)
                      }
                    >
                      <ContentCopyIcon />
                    </button>
                  </div>
                  <div
                    onClick={() => sendTextLiked(responses[currentIndex].value)}
                  >
                    <LikeButton isLiked={mockLike} />
                  </div>
                  <div style={{ direction: "rtl", fontWeight: 600 }}>
                    {responses[currentIndex].value}
                  </div>
                </div>
              )}

              {responseReceived && countGenerateResponse !== 0 && (
                <div>
                  <DiscreteSliderValues onChange={handleSliderChange} />
                  <LoadingButtonsTransition
                    onClick={handleGenerateResponse}
                    loading={loading}
                    buttonLabel="תגובה חדשה"
                  />
                  {/* <p>נשארו {countGenerateResponse} החלפות</p> */}
                </div>
              )}

              {responseReceived && countGenerateResponse === 0 && (
                <div>
                  <p>נגמרו הבקשות אנא שלח שוב</p>
                  <LoadingButtonsTransition
                    onClick={handleSendImage}
                    loading={loading}
                    buttonLabel="שלח"
                  />
                </div>
              )}

              {showAuthDialog && (
                <DialogModal
                  handleConfirm={handleCloseDialog}
                  handleCancel={handleCloseDialog}
                />
              )}
            </>
          )}
        </div>

        {isAuthenticated && (
          <div style={{ bottom: "0px", marginTop: "auto" }}>
            <Link to="/privacy-policy" style={{ marginRight: "10px" }}>
              פרטיות
            </Link>{" "}
            |{" "}
            <Link to="/terms" style={{ marginLeft: "10px" }}>
              תנאים
            </Link>
            <ButtonSizes handleClick={handleOpenFeedback} />
            {/* <AddToHomeScreenPrompt /> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
