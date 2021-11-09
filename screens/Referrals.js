import React, { useEffect, useState } from 'react';
import {
  Share,
  View,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { fetchPositionAPI, postShareGenerated } from '../utils/api';
import Colors from '../constants/Colors';
import LottieView from 'lottie-react-native';

import {
  storeNumber,
  retrieveNumber,
  checkIfNumberStored,
} from '../utils/storage';

const Referrals = () => {
  const [shareMessage, setShareMessage] = useState('https://portfolioapp.kz');
  const [queuePosition, setQueuePosition] = useState('');

  useEffect(() => {
    // bounceBackIfNoNumber();
    makeShareMessage();
    fetchPosition();
  }, []);

  const bounceBackIfNoNumber = async () => {
    const { submitted } = await checkIfNumberStored();
    if (submitted !== true) {
      navigation.navigate('Waitlist');
    }
  };

  const fetchPosition = () => {
    fetchPositionAPI().then((data) => {
      const { position } = data;
      setQueuePosition(position);
    });
  };
  const sendShareGenerated = () => {
    postShareGenerated();
  };

  const makeShareMessage = async () => {
    const { hisownnumber } = await retrieveNumber();
    const sharemsg = `Привет! Смотри, нашел Portfolio - первая легализованная криптобиржа в РК с лицензией от МФЦА, можно покупать продавать и выводить в тенге через них. Нужно занять место в очереди. Вот ссылка -  https://portfolioapp.kz?referrer=${hisownnumber}`;
    setShareMessage(sharemsg);
  };

  const onShare = async () => {
    sendShareGenerated();
    try {
      const result = await Share.share({
        message: shareMessage,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={{ marginTop: 30 }}>
      <View style={{ alignItems: 'center' }}>
        <LottieView
          autoPlay
          style={styles.lottieDimensions}
          source={require('../assets/animations/wallet.json')}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.heroContainer}>
          <Text style={styles.welcomeText}>
            Спасибо! Мы добавили ваш номер в очередь для получения раннего
            доступа
          </Text>
        </View>
      </View>
      <View style={styles.queueNumberContainer}>
        <Text style={styles.welcomeText}>
          {queuePosition} людей в очереди перед вами
        </Text>
        <Text style={styles.subTitle}>
          *первые 50 в очереди получат бонус в 5000тг
        </Text>
      </View>

      <View style={styles.watchlistContainer}>
        <Text style={styles.subTitle}>Хотите получить доступ раньше?</Text>
        <Text style={styles.subTitle}>
          Приглашайте друзей - за каждого успешно приглашенного гостя вы
          становитесь впереди очереди.
        </Text>
      </View>
      <View style={styles.bottomShareContainer}>
        <TouchableOpacity onPress={onShare}>
          <Text stle={styles.saveButtonText}>Поделиться</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lottieDimensions: {
    width: 350,
    height: 350,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
  },
  queueNumberContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 25,
    marginHorizontal: 5,
    borderColor: 'lightgrey',
    borderRadius: 10,
    borderWidth: 3,
  },
  watchlistContainer: {
    padding: 10,
    paddingHorizontal: 25,
    marginHorizontal: 5,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    paddingHorizontal: 25,
    marginHorizontal: 5,
    padding: 10,
  },
  subTitle: { color: Colors.darkText, fontSize: 16, textAlign: 'center' },
  heroContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 25,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  thankyouContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomShareContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0B46E4',
    marginHorizontal: 35,
    marginVertical: 10,
    paddingVertical: 16,
    borderRadius: 6,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
  },
  inputContainer: {
    paddingTop: 15,
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default Referrals;
