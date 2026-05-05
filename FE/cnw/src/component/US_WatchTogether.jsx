import "./US_WatchTogether.css";
import CommentBox from "./Coment";

const US_WatchTogether = () => {
    const contentId = "CT001";   
    const sessionId = "SS123";   
    const user = {
        UserID: "US001",
        FullName: "Hiếu"
    };

    return (
        <div className="US_WatchTogether">
            <CommentBox 
                contentId={contentId}
                sessionId={sessionId}
                user={user}
            />
        </div>
    );
};

export default US_WatchTogether;