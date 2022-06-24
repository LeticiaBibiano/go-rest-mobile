import React, { useState, useEffect } from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage"; 


import {
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from "react-native";


export default function Post() {
    const [post, setPost] = useState([]);
    const [newPost, setNewPost] = useState("");
  
    async function addPost() {
      const search = post.filter(post => post === newPost);
  
      if (search.length !== 0) {
        Alert.alert("Atenção", "Post repetido!");
        return;
      }
  
      setPost([...post, newPost]);
      setNewPost("");
  
      Keyboard.dismiss();
    }
  
    async function remove(item) {
      Alert.alert(
        "Apagar post",
        "Tem certeza que deseja apagar essa postagem?",
        [
          {
            text: "Cancel",
            onPress: () => {
              return;
            },
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => setPost(post.filter(posts => posts !== item))
          }
        ],
        { cancelable: false }
      );
    }
  
    useEffect(() => {
      async function carregaDados() {
        const post = await AsyncStorage.getItem("post");
  
        if (post) {
          setPost(JSON.parse(post));
        }
      }
      carregaDados();
    }, []);
  
    useEffect(() => {
      async function salvaDados() {
        AsyncStorage.setItem("post", JSON.stringify(post));
      }
      salvaDados();
    }, [post]);
  
    return (
      <>
        <KeyboardAvoidingView
          keyboardVerticalOffset={100}
          behavior="padding"
          style={{ flex: 1 }}
          enabled={Platform.OS === "ios"}
        >
          <View style={styles.container}>
            <View style={styles.Body}>
              <FlatList
                data={post}
                keyExtractor={item => item.toString()}
                showsVerticalScrollIndicator={false}
                style={styles.FlatList}
                renderItem={({ item }) => (
                  <View style={styles.ContainerView}>
                    <Text style={styles.Texto}>{item}</Text>
                    <TouchableOpacity onPress={() => remove(item)}>
                      <MaterialIcons
                        name="delete-forever"
                        size={25}
                        color="#f64c75"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
  
            <View style={styles.Form}>
              <TextInput
                style={styles.Input}
                placeholderTextColor="#999"
                autoCorrect={true}
                value={newPost}
                placeholder="Como você está se sentindo hoje?"                
                onChangeText={text => setNewPost(text)}
              />
              <TouchableOpacity style={styles.Button} onPress={() => addPost()}>
                <Ionicons name="ios-add" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 20,
      marginTop: 20,
      backgroundColor: "#FFF"
    },
    Body: {
      flex: 1
    },
    Form: {
      padding: 0,
      height: 60,
      justifyContent: "center",
      alignSelf: "flex-end",
      flexDirection: "row",
      paddingTop: 13,
      borderTopWidth: 1,
      borderColor: "#eee"
    },
    Input: {
      flex: 1,
      height: 40,
      backgroundColor: "#eee",
      borderRadius: 4,
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "#eee"
    },
    Button: {
      height: 40,
      width: 40,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#1c6cce",
      borderRadius: 4,
      marginLeft: 10
    },
    FlatList: {
      flex: 1,
      marginTop: 5
    },
    Texto: {
      fontSize: 14,
      color: "#333",
      fontWeight: "bold",
      marginTop: 4,
      textAlign: "center"
    },
    ContainerView: {
      marginBottom: 15,
      padding: 15,
      borderRadius: 4,
      backgroundColor: "#eee",
  
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      borderWidth: 1,
      borderColor: "#eee"
    }
  });