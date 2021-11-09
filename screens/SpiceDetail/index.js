import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import TextSpaced from 'react-native-letter-spacing';
import Swiper from 'react-native-swiper';

import styles from './styles';
import SliderDot from './components/SliderDot';

// import { Video, AVPlaybackStatus } from 'expo-av';

import { WebView } from 'react-native-webview';

// Within your render function, assuming you have a file called
// "background.mp4" in your project. You can include multiple videos
// on a single screen if you like.

// Later on in your styles..

const RenderSliderImages = ({ images }) => {
  return images.map((eachImage, index) => {
    return (
      <Image
        key={index}
        source={eachImage.source}
        style={styles.slider}
        resizeMode={'cover'}
      />
    );
  });
};

const RenderSlider = ({ images }) => {
  return (
    <Swiper
      loop={false}
      bounces={true}
      dot={<SliderDot />}
      activeDot={<SliderDot active />}
      paginationStyle={{ bottom: 5 }}>
      <RenderSliderImages images={images} />
    </Swiper>
  );
};

const RenderVideo = ({ videourl }) => {
  return (
    <Video
      source={{ uri: videourl }} // Can be a URL or a local file.
      // onBuffer={this.onBuffer} // Callback when remote video is buffering
      // onError={this.videoError} // Callback when video cannot be loaded
      style={styles.backgroundVideo}
    />
  );
};
const RenderYoutube = ({ videourl }) => {
  return (
    <WebView
      style={{ flex: 1 }}
      javaScriptEnabled={true}
      source={{
        uri: 'https://www.youtube.com/embed/ZZ5LpwO-An4?rel=0&autoplay=0&showinfo=0&controls=0',
      }}
    />
  );
};

const RenderFullWebview = ({ videourl }) => {
  return (
    <WebView
      style={{ flex: 1 }}
      javaScriptEnabled={true}
      source={{
        uri: 'https://portfolioapp.kz/%d1%87%d1%82%d0%be-%d1%82%d0%b0%d0%ba%d0%be%d0%b5-%d0%ba%d1%80%d0%b8%d0%bf%d1%82%d0%be%d0%b2%d0%b0%d0%bb%d1%8e%d1%82%d0%b0-%d0%b8-%d0%b1%d0%bb%d0%be%d0%ba%d1%87%d0%b5%d0%b9%d0%bd/',
      }}
    />
  );
};

const SpiceDetail = ({ route }) => {
  const [spiceData, setSpiceData] = useState({
    name: 'default name',
    description: 'default description',
    usage: 'default usage',
    images: [],
    videourl: '',
  });

  const vid =
    'https://portfolio-video-lessons.s3.ap-south-1.amazonaws.com/bbb_sunflower_1080p_60fps_normal.mp4';

  useEffect(() => {
    const { spicesList, spiceId } = route.params;
    const currentSpice = _.find(spicesList, { id: spiceId });
    if (currentSpice !== null) {
      const { name, description, videourl, images } = currentSpice;
      setSpiceData({
        name: name,
        description: description,
        videourl: videourl,
        images: images,
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      {/* <RenderVideo videourl={vid} /> */}
      <RenderFullWebview />
    </View>
  );
};

const SpiceDetailOld = ({ route }) => {
  const [spiceData, setSpiceData] = useState({
    name: 'default name',
    description: 'default description',
    usage: 'default usage',
    images: [],
    videourl: '',
  });

  const vid =
    'https://portfolio-video-lessons.s3.ap-south-1.amazonaws.com/bbb_sunflower_1080p_60fps_normal.mp4';

  useEffect(() => {
    const { spicesList, spiceId } = route.params;
    const currentSpice = _.find(spicesList, { id: spiceId });
    if (currentSpice !== null) {
      const { name, description, videourl, images } = currentSpice;
      setSpiceData({
        name: name,
        description: description,
        videourl: videourl,
        images: images,
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        {/* <RenderVideo videourl={vid} /> */}
        <RenderFullWebview />
      </View>

      <ScrollView>
        <View style={styles.infoContainer}>
          <TextSpaced style={styles.title} letterSpacing={3}>
            {` ${spiceData.name} `}
          </TextSpaced>
          {/* <RenderVideo videourl={spiceData.videourl} /> */}

          <TextSpaced
            style={[styles.title, styles.secondaryTitle]}
            letterSpacing={3}>
            {` ${'Lesson'} `}
          </TextSpaced>
          <Text style={styles.text}>{spiceData.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SpiceDetail;
