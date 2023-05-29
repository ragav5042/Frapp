import React from 'react';

import {
   
    View,
    Image
    
} from 'react-native';

const Filter1=({
  face:{
    bounds:{
      size:{width:faceWidth, height:faceHeight}
    },
    LEFT_EYE,
    RIGHT_EYE
  }
})=>{
  const leftEyePosition = LEFT_EYE;
  const rightEyePosition = RIGHT_EYE;
  const glassWidth = faceWidth;
  const glassHeight = faceHeight/3;

  const tranformAngle =(
    angleRad=Math.atan((rightEyePosition.y-leftEyePosition.y)/rightEyePosition.x-leftEyePosition.x)
  )=> angleRad*180/Math.PI


return(
  <View 
     style={{
       position:'absolute',
       left:leftEyePosition.x-glassWidth*0.675,
       right:leftEyePosition.y - glassHeight*0.5
     }}
  >
    <Image
       source={require('../assets/glasses.png')}
       style={{
         width:glassWidth,
         height:glassHeight,
         resizeMode:'contain',
         transform:[{rotate:`${tranformAngle()}deg`}]
       }}
    />
  </View>
)
}
export default Filter1