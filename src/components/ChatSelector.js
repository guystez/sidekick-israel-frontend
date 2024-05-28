import React, { useState } from 'react';
import './Firsttime.css';

const ChatSelector = ({ selectedSide, onSelectSide }) => {
  // const [selectedSide, setSelectedSide] = useState('left'); // Set the default selected side to 'left'
  // const [checked, setChecked] = useState(true);

  const handleChatClick = (e) => {
    const chatContainer = document.querySelector('.chat-container');
    const rect = chatContainer.getBoundingClientRect();

    if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
      const side = e.clientX < (rect.left + rect.width / 2) ? 'left' : 'right';
      // setSelectedSide(side);
      onSelectSide(side);
      

    }
  };

  return (
    <div onClick={handleChatClick} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className="chat-container">
        <div className={`chat-side left-side ${selectedSide === 'left' ? 'selected' : 'not-selected'}`}>
          {selectedSide === 'left' && <div className="title">זה אני</div>}
          <div className="chat-bubble left">היא כנראה לא</div>
          <div className="chat-bubble left">איך אתה יודע</div>
          <div className="chat-bubble left">גיידר</div>
        </div>
        <div className={`chat-side right-side ${selectedSide === 'right' ? 'selected' : 'not-selected'}`}>
          {selectedSide === 'right' && <div className="title">זה אני</div>}
          <div className="chat-bubble right">והיא באמת לא נראית סטרייטית</div>
          <div className="chat-bubble right">באמת אני לא חושב שהיא</div>
        </div>
        <div className={`chat-side left-side ${selectedSide === 'left' ? 'selected' : 'not-selected'}`}>
          {selectedSide === 'left' && <div className="title">זה אני</div>}
          <div className="chat-bubble left">היא כנראה לא</div>
          <div className="chat-bubble left">איך אתה יודע</div>
          <div className="chat-bubble left">גיידר</div>
        </div>
        <div className={`chat-side right-side ${selectedSide === 'right' ? 'selected' : 'not-selected'}`}>
          {selectedSide === 'right' && <div className="title">זה אני</div>}
          <div className="chat-bubble right">והיא באמת לא נראית סטרייטית</div>
          <div className="chat-bubble right">באמת אני לא חושב שהיא</div>
          <div className="chat-bubble right">אניקה אני סופר הומו אני מזהה אחד כשאני רואה אחד</div>
        </div>
      </div>
    </div>
  );
};

export default ChatSelector;
