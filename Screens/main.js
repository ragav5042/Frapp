import React from "react"
import {StyleSheet,View,Text,SafeAreaView,StatusBar,Platform} from "react-native"
import * as Permissions from 'expo-permissions'
import * as FaceDetector from 'expo-face-detector'
import {Camera} from 'expo-camera'

import Filter1 from './Filter1'
export default class Mainscreen extends React.Component{
  constructor(props){
    super(props)
    this.state={
      hascamerapermission:null,
      faces:[],
    }
    this.givecamerapermssions=this.givecamerapermssions.bind(this)
    this.onfacedetected=this.onfacedetected.bind(this)
    this.ondetectionerror=this.ondetectionerror.bind(this)
  }
    componentDidMount(){
      Permissions.askAsync(Permissions.CAMERA)
    }
    givecamerapermssions({status}){
      this.setState({
        hascamerapermission:status=="granted"
      })
    }
    onfacedetected({faces}){
      this.setState({faces:faces})
      console.log(faces)
    }
    ondetectionerror(error){
      console.log(error)
    }
 render(){
   const {hascamerapermission}=this.state
   if(hascamerapermission===null){
     return <View/>
   }
   if(hascamerapermission===false){
     return(
       <View style={styles.container}>
    <Text>No Access To Camera</Text>
       </View>
     )
   }
  return(
   <View style={styles.container}>
    <SafeAreaView style={styles.droidSafeArea}/>
    <View style={styles.headingContainer}>
    <Text style={styles.titleText}> FRAPP </Text>
    </View>
    <View style={styles.cameraStyle}>
    <Camera 
    style={{flex:1}}
    type={Camera.Constants.Type.front}
    faceDetectorSettings={{
       mode: FaceDetector.FaceDetectorMode.fast,
      detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
      runClassifications: FaceDetector.FaceDetectorClassifications.all,
    }}
    onFacesDetected={this.onfacedetected}
    onFacesDetectionError={this.ondetectionerror}
     />
      {
                        this.state.faces.map(face => {
                            return <Filter1 key={face.faceID} face={face} />
                        })
                    }
    </View>
   </View>

  )
 }
}

const styles=StyleSheet.create({
  container: { flex: 1 },
   droidSafeArea: {
   marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 
   },
headingContainer: { 
  flex: 0.1, alignItems: 'center', justifyContent: 'center' 
  },
titleText: {
   fontSize: 30 
   },
cameraStyle: { 
  flex: 0.65
   }
})