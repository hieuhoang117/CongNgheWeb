import "./EpisodeItem.css";

const EpisodeItem = ({ ep, onClick }) => {
  return (
    <div className="episode-item" onClick={onClick}>
      
   
      <div className="episode-thumb">
        <img
          src={ep.thumbnail || ep.poster || "https://via.placeholder.com/150"}
          alt={ep.EpisodeName}
        />
      </div>

      {/* Nội dung */}
      <div className="episode-info">
        <h4>
          Tập {ep.EpisodeNumber}: {ep.EpisodeName}
        </h4>

        <p>{ep.Description || "Không có mô tả"}</p>

        <div className="episode-meta">
          <span>{ep.Duration} phút</span>
          <span>
            {ep.ReleaseDate
              ? new Date(ep.ReleaseDate).toLocaleDateString()
              : ""}
          </span>
        </div>
      </div>

    </div>
  );
};

export default EpisodeItem;