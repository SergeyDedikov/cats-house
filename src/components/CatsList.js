import "./CatsList.css";
import CatCard from "./CatCard";

function CatsList({ cats, ...props }) {
  const loadMessage = <p>... загружаем ещё котиков ...</p>;

  return (
    <section className="cats" aria-label="Кошки">
      <ul className="cats__list">
        {cats.map((item) => (
          <CatCard key={item.id} cat={item} {...props} />
        ))}
      </ul>
      {!props.isLiked && loadMessage}
    </section>
  );
}

export default CatsList;
