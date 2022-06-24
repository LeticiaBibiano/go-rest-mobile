import React, { useState } from 'react';

import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message/lib/src/Toast';

import { KeyboardAvoidingView, 
         ScrollView, 
         StyleSheet, 
         Text, 
         View, 
         TextInput, 
         Pressable 
} from 'react-native';

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState(""); 

  const { getItem, setItem } = useAsyncStorage("@savepass:passwords");
  
  async function newUser(navigation){
      try {
        const id = uuid.v4();
  
        const newData = {
          id,
          name,
          email,
          gender,
          status
        }
  
        const response = await getItem();
        const previousData = response ? JSON.parse(response) : [];
  
        const data = [...previousData, newData];
  
        await setItem(JSON.stringify(data));
        Toast.show({
          type: "success",
          text1: "Cadastrado com sucesso!"
        })
      } catch (error) {
        console.log(error);
  
        Toast.show({
          type: "error",
          text1: "Não foi possível cadastrar."
        })
      }
      navigation.reset({
        index: 0,
        routes: [{name: "post"}]
      })    
  }  

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={50}
      behavior="padding"
      
      enabled={Platform.OS === "ios"}
    >
      <ScrollView>
        <View >
          <Text style={{marginBottom: 25, fontSize: 40, alignSelf: 'center'}}>GoRest Mobile</Text>
          <View >
            <Text style={{paddingLeft: 15}}>Nome:</Text>
            <TextInput
              placeholderTextColor="#999"
              style={styles.input}
              placeholder="Nome"
              onChangeText={setName}
            />
          </View>
          <View>
            <Text style={{paddingLeft: 15}}>E-mail:</Text>
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              onChangeText={setEmail}
            />
          </View>
          <View>
            <Text style={{paddingLeft: 15}}>Sexo:</Text>
            <TextInput
              style={styles.input}
              placeholder="Sexo"
              onChangeText={setGender}
            />
          </View>  
          <View>  
            <Text style={{paddingLeft: 15}}>Status:</Text>
            <TextInput
              label="abc"
              style={styles.input}
              placeholder="Status"
              onChangeText={setStatus}
            />
          </View>  
          <Pressable style={{backgroundColor: 'lightblue', 
                             padding: 15, 
                             width: 200, 
                             alignItems: 'center', 
                             borderRadius: 10, 
                             marginTop:25,
                             alignSelf: 'center'
                            }} 
                     onPress={newUser}>
            <Text>Cadastrar</Text>
          </Pressable>          
        </View>
      </ScrollView>
    </KeyboardAvoidingView>  
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#d3d3d3',
    color: 'black',
  },
});
