import "./CatCard.css";

function CatCard({ cat, onLikeClick, isLiked }) {
  const styleBackgroundImage = {
    backgroundImage: `url(${cat.url})`,
  };

  function handleLickClick() {
    onLikeClick(cat);
  }

  return (
    <li className="cat" style={styleBackgroundImage}>
      <div className="cat__overlay">
        <button
          onClick={handleLickClick}
          className={`cat__button-like button ${
            isLiked ? "cat__button-like_active" : ""
          }`}
        ></button>
      </div>
    </li>
  );
}

export default CatCard;
