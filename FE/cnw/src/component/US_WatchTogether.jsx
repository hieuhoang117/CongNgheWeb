import "./US_WatchTogether.css";
import CommentBox from "./Coment";
import userStore from "../store/useUserStore";

const US_WatchTogether = () => {
    const userId = userStore((state) => state.userId);
    const contentId = "CT001";
    const sessionId = "SS123";
    const user = {
        UserID: userId,
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