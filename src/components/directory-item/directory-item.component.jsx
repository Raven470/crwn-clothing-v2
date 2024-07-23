import { useNavigate } from "react-router-dom";
import "./directory-item.styles.jsx";
import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from "./directory-item.styles.jsx";

export default function DirectoryItem({ category }) {
  const { title, imageUrl, route } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage
        imageurl={imageUrl}
        // style={{
        //   backgroundImage: `url(${imageUrl})`,
        // }}
      />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
}
