import ContentLoader from 'react-content-loader';

const ItemLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={248}
      height={248}
      viewBox="0 0 248 248"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <rect x="133" y="125" rx="0" ry="0" width="1" height="0" />
      <rect x="0" y="0" rx="7" ry="7" width="248" height="248" />
      <rect x="0" y="278" rx="7" ry="7" width="280" height="24" />
      <rect x="0" y="325" rx="7" ry="7" width="280" height="85" />
      <rect x="0" y="417" rx="7" ry="7" width="280" height="30" />
    </ContentLoader>
  );
};

export default ItemLoader;
