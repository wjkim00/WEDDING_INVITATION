// utils/loadImages.js
const importAll = (requireContext) => {
    return requireContext.keys().map(requireContext);
  };

  const images = importAll(require.context('../assets/imgs', false, /\.webp$/));

  export default images;
