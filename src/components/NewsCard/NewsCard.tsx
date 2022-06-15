import './NewsCard.css';
import CoverSkeletonImage from '../../assets/images/card_cover_skeleton.png';
import { NewsItem } from '../../store/AppStore';
import { useNavigate } from 'react-router-dom';

interface NewsCardProps {
  newsItem: NewsItem;
  idx?: number;
  titleOnly?: boolean;
  displayBody?: boolean;
  height?: string;
}

export const NewsCard = (props: NewsCardProps): JSX.Element => {
  const news = props.newsItem;
  const navigate = useNavigate();

  const renderImage = (titleOnly?: boolean, imageUrl?: string): JSX.Element => {
    if (!titleOnly && imageUrl) {
      return <img className='newscard-thumbnail' src={news.fields.thumbnail} />;
    } else {
      return (
        <img className='newscard-thumbnail' src={CoverSkeletonImage}></img>
      );
    }
  };

  return (
    <div
      className={'newscard-item ' + (props.titleOnly ? 'title-only' : '')}
      style={{ minHeight: props.height }}
      onClick={() => navigate(`/article/${props.newsItem.id}`)}
    >
      {renderImage(props.titleOnly, news.fields.thumbnail)}
      <div className='newscard-content-wrapper'>
        <div className='newscard-content-wrapper-spacer'>
          <p className='newscard-title'>{news.webTitle}</p>
          <p
            className='newscard-body'
            style={!props.displayBody ? { display: 'none' } : {}}
          >
            {news.fields.bodyText}
          </p>
        </div>
      </div>
    </div>
  );
};
