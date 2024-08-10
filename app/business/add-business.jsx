import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import RNPickerSelect from 'react-native-picker-select'
import { db, storage } from '../../config/FirebaseConfig'
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore'
import { ref, uploadBytes, blob, getDownloadURL } from 'firebase/storage'
import { useUser } from '@clerk/clerk-expo'
import { usePushNotifications } from '../../hooks/usePushNotifications'

export default function AddBusiness() {

  const navigation = useNavigation()

  const [image, setImage] = useState(null)

  const [categoryList, setCategoryList] = useState([])

  const [name, setName] = useState()
  const [address, setAddress] = useState()
  const [contact, setContact] = useState()
  const [website, setWebsite] = useState()
  const [about, setAbout] = useState()
  const [category, setCategory] = useState()

  const { user } = useUser()
  const [ loading, setLoading ] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add New Business',
      headerShown: true,
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
      headerTintColor: '#fff', // Set the back icon color to white
      headerTitleStyle: {
        color: '#fff' // Set the header text color to white
      }
    })
    getCategoryList()
  }, [])

  const getCategoryList = async () => {
    setCategoryList([])
    const q = query(collection(db, "Category"))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      setCategoryList(prev => [...prev, {
        label: (doc.data()).name,
        value: (doc.data()).name
      }])
    })
  }

  const  { expoPushToken, notification } = usePushNotifications()
  const data = JSON.stringify(notification, undefined,2)


  const onAddNewBusiness = async () => {
    setLoading(true)
    const fileName = Date.now().toString()+".jpg"
    const resp = await fetch(image)
    const blob = await resp.blob()

    const imageRef = ref(storage, 'business-directory/'+fileName)

    uploadBytes(imageRef, blob).then((snapshot) => {
    }).then(res => {
      getDownloadURL(imageRef).then(async(downloadUrl) => {
        saveBusiness(downloadUrl)
      })
    })
    setLoading(false)
  }

  const saveBusiness = async (imageUrl) => {
    await setDoc(doc(db, "BusinessList", Date.now().toString()), {
      name: name,
      address: address,
      contact: contact,
      website: website,
      about: about,
      category: category,
      imageUrl: imageUrl,
      username: user?.fullName,
      userEmail: user?.primaryEmailAddress.emailAddress,
      userImage: user?.imageUrl
    })

    
    ToastAndroid.show('New Business Added...', ToastAndroid.LONG)
  }
  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    setImage(result?.assets[0].uri)
    console.log(expoPushToken, data)
  }
  return (
    <ScrollView
    showsVerticalScrollIndicator={false}
    style={{
      padding: 20
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 25
      }}>Add New business</Text>
      <Text style={{
        fontFamily: 'outfit',
        fontSize: 16,
        color: Colors.GRAY
      }}>Fill all details in oder to add new business</Text>

      <TouchableOpacity style={{
        marginTop: 20
      }}
      onPress={() => onImagePick()}
      >
        {!image ? <Image source={require('../../assets/images/icons/camera.gif')} style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          marginTop: 20
        }} /> : 
        <Image source={{uri: image}} style={{
          width: 100,
          height: 100,
          borderRadius: 15
        }} />}
        
      </TouchableOpacity>
      <View>
      <TextInput
        onChangeText={(text) => setName(text)}
        placeholder="Business Name"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.PRIMARY,
          padding: 10,
          fontSize: 17,
          marginTop: 10,
          fontFamily: 'outfit'
        }}
      />
      <TextInput
        onChangeText={(text) => setAddress(text)}
        placeholder="Address"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.PRIMARY,
          padding: 10,
          fontSize: 17,
          marginTop: 10,
          fontFamily: 'outfit'
        }}
      />
      <TextInput
        onChangeText={(text) => setContact(text)}
        placeholder="Contact"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.PRIMARY,
          padding: 10,
          fontSize: 17,
          marginTop: 10,
          fontFamily: 'outfit'
        }}
      />
      <TextInput
        onChangeText={(text) => setWebsite(text)}
        placeholder="Website"
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.PRIMARY,
          padding: 10,
          fontSize: 17,
          marginTop: 10,
          fontFamily: 'outfit'
        }}
      />
      <TextInput
        onChangeText={(text) => setAbout(text)}
        placeholder="About"
        multiline={true}
        numberOfLines={5}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.PRIMARY,
          padding: 10,
          fontSize: 17,
          marginTop: 10,
          fontFamily: 'outfit',
          height: 100
        }}
      />
      </View>
      <View style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.PRIMARY,
          marginTop: 10,
          fontFamily: 'outfit'
        }}
      >
        <RNPickerSelect
        onValueChange={(value) => setCategory(value)}
        items={categoryList}
        />
      </View>

      <TouchableOpacity
      disabled={loading}
      onPress={() => onAddNewBusiness()}
      >
        {loading ? (
          <ActivityIndicator size="large" color={'#fff'} />
        ) : (
          <Text style={{
            backgroundColor: Colors.PRIMARY,
            color: 'white',
            padding: 10,
            textAlign: 'center',
            borderRadius: 5,
            marginTop: 20,
            fontFamily: 'outfit-bold'
          }}>Add New Business</Text>
        )}
        
      </TouchableOpacity>

      <View style={{
        height: 50
      }}></View>
      
    </ScrollView>
  )
}