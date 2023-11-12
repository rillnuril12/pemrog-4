import Axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Image, Animated} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Details({route, navigation}) {
  const [details, setDetails] = useState({});
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.loop(
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  useEffect(() => {
    Axios.get(
      'https://api.themoviedb.org/3/movie/' +
        route.params.movie_id +
        '?api_key=570c36d75740509c00d865a804d826a5&language=en-US',
    ).then((e) => setDetails(e.data));
  }, []);

  return (
    <View style={{flex: 1,padding: 30,backgroundColor: 'black'}}>
      <Animated.Text
        style={{
          position: 'absolute',
          opacity: fadeAnim,
          marginTop: 10,
          alignItems: 'center',
          right: 140,
          fontSize: 30,
          fontFamily: 'times new roman',
          color: 'red'
        }}>
        {details.status}
      </Animated.Text>
      <View style={{alignItems: 'center', marginTop: 20}}>
        <Text style={{fontSize: 14,fontWeight: 'bold',position: 'absolute', left: 150,marginTop: 50, color: 'red'}}>{details.title}</Text>
        <View style={{alignItems: 'center',marginTop: 50}}>
        <Text style={{
          fontSize: 14,
          fontWeight: 'bold',
          position: 'relative',
          left: 50,
          marginTop: 40,
          color: 'red',
        }}>Film Unggulan 2022</Text>
      </View>
        <Image
          source={{
            uri: 'https://image.tmdb.org/t/p/w500' + details.poster_path,
          }}
          style={{height: 150, width: 150, right: 100, margin: -60, borderRadius: 5}}
        />
      </View>
      <View
        style={{
          padding: 15,
          margin: 10,
        }}>
        <Text style={{textAlign: 'justify', color: 'white', fontSize: 18, position: 'relative', marginTop: 70}}>{details.overview}<></></Text>
      </View>
      <View style ={{position: 'relative', left: 0, padding: 50}}>
        <TouchableOpacity onPress={async ()=>{
          navigation.navigate('Homepage', {});
        }}>
          <Text style={{color: 'white',fontFamily: 'times new roman',fontWeight:'bold',textAlign: 'center', fontSize: 15}}>Home</Text>
        </TouchableOpacity>
      </View>
      <Text style={{fontSize: 14,fontWeight: 'bold',position: 'absolute', left: 150,marginTop: 50, color: 'red'}}>{details.release_date}</Text>     
    </View>
  );
}   