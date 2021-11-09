import React, { useEffect, useState, useRef } from 'react';

import { View, ScrollView, Button } from 'react-native';

import styles from './styles';
// import SpiceBox from './components/SpiceBox';
import lessons from '../../DB/lessons';
import { WebView } from 'react-native-webview';
import { AntDesign } from '@expo/vector-icons';

// const SpiceListItself = (props) => {
//   const { lessonList, navigation } = props;
//   return lessonList.map((eachLesson) => {
//     return (
//       <SpiceBox
//         key={eachLesson.id}
//         id={eachLesson.id}
//         name={eachLesson.name}
//         image={eachLesson.thumbnail}
//         onPress={() => {
//           // alert(eachLesson.id);
//           navigation.push('SpiceDetail', {
//             spiceId: eachLesson.id,
//             spiceThumbnail: eachLesson.thumbnail,
//             spicesList: lessonList,
//           });
//         }}
//       />
//     );
//   });
// };

// const SpiceList = ({ navigation }) => {
//   const [lessonList, setLessonList] = useState(lessons);

//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         <View style={styles.listContainer}>
//           <SpiceListItself lessonList={lessonList} navigation={navigation} />
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

const SpiceList = () => {
  const webViewRef = useRef(null);

  const goback = () => {
    webViewRef.current.goBack();
  };

  return (
    <View style={styles.container}>
      {/* <RenderVideo videourl={vid} /> */}

      <WebView
        ref={webViewRef}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        source={{
          uri: 'https://portfolioapp.kz/academy/',
        }}
      />
      <View>
        <Button title="Назад" onPress={() => goback()} />
      </View>
    </View>
  );
};

export default SpiceList;
