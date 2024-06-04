import React, { useState } from "react";


function Tips() {
    const [showTips, setShowTips] = useState(false);
    const toggleTips = () => {
        setShowTips(!showTips);
    };
    return (
        <div>
    <button className="tips-button" onClick={toggleTips}>טיפים</button>
    {showTips && (
        <div className="tips">
            <ul>
                <li><p> ודא שההודעה האחרונה שנראית בתמונה, תהיה מהאדם השני, לא ממך.</p></li>
                <li><p>ודא שהצד שלך בשיחה תואם לצד שמוגדר בכפתור מתחת לתמונה (ימין/שמאל).</p></li>
                <li><p>שלח תמונות כפי שהן - ללא עריכה, ללא חיתוך, וללא מקלדת.</p></li>
            </ul>
            <button onClick={toggleTips}>סגור</button>
        </div>
    )}
</div>

    )
}

export default Tips