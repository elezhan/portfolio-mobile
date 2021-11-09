import * as React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import Button from '../components/Button';

import { Text } from '../components/Themed';
import TopMovers from '../components/TopMovers';
import Watchlist from '../components/Watchlist';
import LottieView from 'lottie-react-native';
import Colors from '../constants/Colors';
import TitleText from '../components/TitleText';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import NewsThumbnail from '../components/NewsThumbnail';
import CommonStyles from '../constants/CommonStyles';
import { useGatewayContext } from '../context/GatewayContext';
import { apiKey, baseUrl, endpoint, queryOptions } from '../constants/Config';


dayjs.extend(relativeTime);

export default function Home({navigation}) {
  const { openExplorer } = useGatewayContext();
  const [news, setNews] = React.useState<INews[]>([]);

  const handleNavigateWaitlist = async () => {
    navigation.navigate('Купить', { screen: 'Waitlist' });
  }

  const getNews = async () => {
    const { sortBy, limit, search } = queryOptions;

    const response = await fetch(
      `${baseUrl}/${endpoint}?q=${search}&pageSize=${limit}&sortBy=${sortBy}&apiKey=${apiKey}`
    );
    const { articles } = await response.json();
    setNews(articles as INews[]);
  };

  React.useEffect(() => {
    getNews();
  }, []);

  const renderItem: ListRenderItem<INews> = React.useCallback(
    ({ item }) => {
      const { title, source, publishedAt, url, urlToImage } = item;
      return (
        <Pressable
          onPress={() => openExplorer(url)}
          style={styles.newsContainer}>
          <View style={CommonStyles.flexOne}>
            <Text style={CommonStyles.darkText}>
              {`${source.name} • ${dayjs(publishedAt).fromNow()}`}
            </Text>
            <Text style={styles.newsTitle}>{title}</Text>
          </View>
          <NewsThumbnail uri={urlToImage} />
        </Pressable>
      );
    },
    [news]
  );

  return (
    <FlatList<INews>
      data={news}
      contentContainerStyle={styles.container}
      ListHeaderComponent={
        <React.Fragment>
          <View style={{ alignItems: 'center' }}>
            <LottieView
              autoPlay
              style={styles.lottieDimensions}
              source={require('../assets/animations/wallet.json')}
            />

            <View style={styles.heroContainer}>
              <Text style={styles.welcomeText}>Добро пожаловать в Portfolio</Text>
              <Text style={styles.subTitle}>первая легализованная критпо биржа в РК</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleNavigateWaitlist}
            >
              <Text style={styles.saveButtonText}>купить / продать</Text>
            </TouchableOpacity>
            </View>
          {/* <Button label="купить / продать" onPress={handleNavigateWaitlist}/> */}

          <Watchlist />
          <TopMovers />
          <TitleText title="Новости" />
        </React.Fragment>
      }
      keyExtractor={(_, index) => `${index}`}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
  },
  lottieDimensions: {
    width: 250,
    height: 250,
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#0B46E4',
    backgroundColor: '#0B46E4',
    padding: 15,
    margin: 25,
    borderRadius: 6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
  welcomeText: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  subTitle: { color: Colors.darkText, fontSize: 16 },
  heroContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 25,
  },
  newsContainer: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  newsTitle: { marginTop: 5, fontSize: 18 },
});
