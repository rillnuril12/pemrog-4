import {
  View,
  Text,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
  SafeAreaView
} from 'react-native';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Homepage = ({ navigation }) => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  console.log("ini data movie", movies);
  useEffect(() => {
      axios
          .get(
              'https://api.themoviedb.org/3/trending/movie/day?api_key=3e20a7c466ac2ae7ed3b5caafa316c1b',
          )
          .then((res) => {
              // console.log('res', res);

              setMovies(res.data.results);
          });
  }, []);

  if (loading) {
      return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text>Loading</Text>
          </View>
      );
  }

  return (
      <SafeAreaView style={{ flex: 1, backgroundColor : 'black', }}>
          <TextInput style={{color : 'black', backgroundColor : 'white',}}
              placeholder="Search movie"
              value={search}
              onChangeText={(e) => setSearch(e)}
          />
          <TouchableOpacity style={{color : 'black', backgroundColor : 'white',}}
              onPress={async () => {
                  setLoading(true);
                  await axios
                      .get(
                          `https://api.themoviedb.org/3/search/movie?api_key=570c36d75740509c00d865a804d826a5&language=en-US&page=1&query=${search}&include_adult=false`,
                      )
                      .then((e) => {
                          console.log('e', e);

                          setMovies(e.data.results);
                          setLoading(false);
                          setSearch('');
                          navigation.navigate('Search', {
                              movie: movies,
                          });
                      });
              }}>
              <Text style={{
                textAlign : 'center', 
                backgroundColor: 'black',
                color : 'white'
                }}>Submit</Text>
          </TouchableOpacity>
          <FlatList
              data={movies}
              numColumns={2}
              keyExtractor={(item) => item.id}
              renderItem={(e) => {
                  return (
                      <TouchableOpacity
                          style={{
                              flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                              margin: 5,
                              borderWidth: 2,
                              borderRadius: 10,
                              backgroundColor: 'black',
                              padding: 5,
                              elevation: 10,
                          }}
                          onPress={() => {
                              navigation.navigate('Details', { movie_id: e.item.id });
                          }}>
                          <View
                              style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                              }}>
                              <Text
                                  style={{
                                      color: 'red',
                                      textAlign: 'center',
                                      fontWeight: 'bold',
                                  }}>
                                  {e.item.title}
                              </Text>
                          </View>
                          <Image
                              style={{
                                  height: Dimensions.get('screen').height * 0.17,
                                  width: Dimensions.get('screen').height * 0.17,
                                  borderRadius: 10,
                              }}
                              source={{
                                  uri: `https://image.tmdb.org/t/p/w500${e.item.poster_path}`,
                              }}
                          />
                          <Text style={{
                            color : 'red',
                            fontWeight : 'bold'
                          }}>Movie id:{e.item.id}</Text>
                      </TouchableOpacity>
                  );
              }}
          />
      </SafeAreaView>
  );
}

export default Homepage