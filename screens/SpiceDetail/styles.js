import { Dimensions } from 'react-native';

// maintaining a 16:10 aspect ratio
const { width } = Dimensions.get('window');
const sliderWidth = width;
const sliderHeight = width * (10 / 16);
const appBackgroundColor = 'white';
const margin = 16;
const primaryFontColor = '#000';

// font sizes
export const primaryFontSize = 14;

export default {
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  container: {
    flex: 1,
    backgroundColor: appBackgroundColor,
  },

  sliderContainer: {
    height: sliderHeight,
    width: sliderWidth,
  },

  slider: {
    height: sliderHeight,
    width: sliderWidth,
  },

  fakeImageForTransition: {
    height: sliderHeight,
    width: sliderWidth,
    position: 'absolute',
    top: 0,
    left: 0,
  },

  infoContainer: {
    marginTop: 24,
    marginBottom: 24,
    marginLeft: margin,
    marginRight: margin,
  },

  title: {
    marginBottom: 10,
    // fontFamily: fontFamilyLight,
    fontSize: 32,
    color: primaryFontColor,
  },

  text: {
    marginLeft: 8,
    marginRight: 8,
    // fontFamily,
    fontSize: primaryFontSize,
    lineHeight: 24,
    color: primaryFontColor,
  },

  secondaryTitle: {
    // fontFamily: fontFamilyLight,
    fontSize: 24,
    marginTop: 24,
    marginBottom: 10,
  },
};
