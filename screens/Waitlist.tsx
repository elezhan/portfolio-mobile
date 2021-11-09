import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet,TextInput,TouchableOpacity, Keyboard,TouchableWithoutFeedback } from 'react-native';
import { storeNumber,checkIfNumberStored } from "../utils/storage";
import LottieView from 'lottie-react-native';

//note - to avoid weird bugs whewre they submitted by accident, let's only cosndier phone submitted once they have goen through OTP correctly

const Waitlist = ({navigation}) => {
  const [customerPhone,setCustomerPhone] = useState('+7');

  useEffect(()=> {
    bounceIfSumbitted()
  },[])

  const bounceIfSumbitted = async () => {
    const {submitted} = await checkIfNumberStored()
    if (submitted === true) {
      handleNavigate()
    }

  }
  

  const handleNavigate = async () => {
    navigation.navigate('Referrals');
  }


  const handlePhoneSubmit = () => {
    alert(customerPhone)
    storeNumber({hisownnumber:customerPhone})
    handleNavigate()
  }

  return (
    <View style={styles.screen}>
      <View style={styles.lottieContainer}>
        <LottieView
          autoPlay
          style={styles.lottieDimensions}
          source={require('../assets/animations/wallet.json')}
        />
      </View>
      <View style={{ alignItems: 'center' }}>
        <View style={styles.heroContainer}>
          <Text style={styles.welcomeText}>
          Покупка и продажа криптовалюты доступна через программу раннего доступа
          </Text>
        </View>
      </View>

      <View style={styles.firstParContainer}>
      <Text style={styles.firstParText}>Чтобы получить раний доступ к торговле, пожалуйста введите ваш номер:</Text>
      </View>
      
      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setCustomerPhone(text)} 
          value={customerPhone}
          onBlur={Keyboard.dismiss}
        />
      </View>
      </TouchableWithoutFeedback>
        
      <View>
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handlePhoneSubmit}
      >
        <Text style={styles.saveButtonText}>Отправить</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lottieContainer:{
    marginBottom:15,
    alignContent:'center',
    // flex:0.5
  },
  lottieDimensions: {
    width: 250,
    height: 250,
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
  heroContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 25,
  },
  firstParContainer : {
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstParText : {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    paddingLeft: 20,
    paddingRight: 20,

  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  saveButton: {
    borderWidth: 1,
    borderColor: '#0B46E4',
    backgroundColor: '#0B46E4',
    padding: 15,
    margin: 5,
    borderRadius: 6,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center'
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop:10,
    marginBottom:10
  }
});

export default Waitlist;
